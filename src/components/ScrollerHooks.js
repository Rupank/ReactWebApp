import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import debounce from 'lodash.debounce';

const MAX_ALLOWED_CONTENT = 50;
function ScrollerHooks() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [completed, setCompleted] = useState(false);

    function fetchItems() {
        setLoading(true);
        axios.get('https://randomuser.me/api/?results=10')
            .then(res => {
                setLoading(false);
                let newUsers = res.data.results.map(user => ({
                    username: user.login.username,
                    email: user.email,
                    photo: user.picture.medium,
                    name: Object.values(user.name).join(" ")
                }))
                setPosts([...posts, ...newUsers]);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchItems();
    }, [])

    useEffect(() => {
        if (!isLoading) {
            setCompleted((posts.length >= MAX_ALLOWED_CONTENT) ? true : false);
        }
    }, [isLoading])

    window.onscroll = debounce(() => {
        if (error || completed || isLoading) {
            return;
        }
        fetchItems();
    }, 100)

    return (
        <div>
            <div>Infinite Scroller!!</div>
            <p>Scroll Down to load more content</p>
            {posts.map(user => (
                <Fragment key={user.username}>
                    <hr />
                    <div style={{ display: 'flex' }}>
                        <img alt={user.username} src={user.photo}
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                marginRight: 20
                            }}
                        />
                        <div>
                            <h2 style={{ marginTop: 0 }}>@{user.username}</h2>
                            <h3>Name - {user.username}</h3>
                            <h3>Email - {user.email}</h3>
                        </div>
                    </div>
                </Fragment>
            ))}
            <hr />
            {
                isLoading && <div> Loading Content...</div>
            }
            {
                error && error.length > 0 && <div style={{ color: 'red' }}>{error}</div>
            }
            {
                completed && <div>You have reached the end of content</div>
            }

        </div>
    )
}

export default ScrollerHooks
