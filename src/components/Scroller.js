import React, { Component, Fragment } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
const MAX_CONTENT_ALLOWED = 50;
class Scroller extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            completed: false,
            error: '',
            posts: []
        }

        window.onscroll = debounce(() => {
            const { error, completed, isLoading } = this.state;

            if (error || completed || isLoading) {
                return;
            }

            if (window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight) {
                this.fetchItems();
            }
        }, 100)
    }


    fetchItems = () => {
        const { posts } = this.state;
        this.setState({
            isLoading: true
        }, () => {
            axios.get('https://randomuser.me/api/?results=10')
                .then(result => {
                    const newPosts = result.data.results.map(post => ({
                        email: post.email,
                        username: post.login.username,
                        name: Object.values(post.name).join(" "),
                        id: post.login.uuid,
                        photo: post.picture.medium
                    }))
                    this.setState({
                        isLoading: false,
                        posts: [...posts, ...newPosts]
                    }, () => {
                        this.setState({
                            completed: (this.state.posts.length >= MAX_CONTENT_ALLOWED) ? true : false
                        })
                    })
                })
                .catch(err => {
                    this.setState({
                        error: err.message,
                        isLoading: false
                    });
                })
        })

    }
    componentDidMount() {
        this.fetchItems();
    }

    render() {

        const { posts, error, isLoading, completed } = this.state;
        return (
            <div>
                <div>Infinite Scroller</div>
                <p>Scroll down to load more content</p>
                {
                    posts.map(post => (
                        <Fragment key={post.username}>
                            <hr />
                            <div style={{ display: 'flex' }}>
                                <img alt={post.username} src={post.photo}
                                    style={{
                                        width: 72,
                                        height: 72,
                                        borderRadius: '50%',
                                        marginRight: 20
                                    }}
                                />
                                <div>
                                    <h2 style={{ marginTop: '0' }}>@{post.username}</h2>
                                    <h3>Name - {post.name}</h3>
                                    <h3>Email - {post.email}</h3>
                                </div>
                            </div>
                        </Fragment>
                    ))
                }
                <hr />

                {isLoading && <div> Loading content...</div>
                }
                {
                    error && error.length > 0 && <div>Some Error Occured</div>
                }
                {
                    completed && <div>You have reached the end of the content</div>
                }
            </div>
        )
    }
}
export default Scroller;