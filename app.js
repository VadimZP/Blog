const app = (function () {

    /** Variables */
    const addPostBtn = document.getElementById('btn_add-post');
    let postId = 0;

    /**
     * Creates blog app controller.
     * @constructor
     */
    function Blog() {
        let _ = this;

        /** Posts storage */
        this.posts = [];

        /**
         * Output posts to the page from storage.
         * @param  {boolean} addNewPost - if true, add newly created post
         */
        this.renderPosts = function (addNewPost) {
            if (!this.posts.length) return;

            const postsContainer = document.querySelector('.post-list');

            if (addNewPost) {
                const addedPost = this.posts[this.posts.length - 1];
                const postElem = addedPost.createPostStruct(addedPost.text);

                postsContainer.appendChild(postElem);
            } else {
                this.posts.forEach(elem => {
                    const postElem = elem.createPostStruct(elem.text);

                    postsContainer.appendChild(postElem);
                });
            }
        }

        /**
         * Adds new post-object to the post's storage.
         */
        this.addPost = () => {
            function Post(id) {
                this.id = id;
            }

            /**
             * Creates post HTML structure.
             * @param  {string} postText - text property from post-object
             */
            Post.prototype.createPostStruct = function () {

                /** Variables */
                let postDocFrag, li, header, body, btnRemove;

                postDocFrag = document.createDocumentFragment();

                li = document.createElement('li');
                li.className = 'post';

                header = document.createElement('header');
                header.className = 'post-header';

                btnRemove = document.createElement('button');
                btnRemove.className = 'btn_remove-post';
                btnRemove.innerHTML = 'X';

                body = document.createElement('div');
                body.className = 'post-body';
                body.innerHTML = this.id;

                li.appendChild(header);
                li.appendChild(btnRemove);
                li.appendChild(body);

                postDocFrag.appendChild(li);

                btnRemove.addEventListener('click', () => {
                    let index = _.posts.findIndex((elem) => {
                        if (elem.id === this.id) return elem;
                    });
                    
                    _.posts.splice(index, 1);

                    li.remove();
                });
                
                return postDocFrag;
            }

            this.posts.push(new Post(postId++));

            this.renderPosts(true);
        }


    }

    // Initialization step
    const blog = new Blog();

    const postAdding = function () {
        addPostBtn.addEventListener('click', blog.addPost);
    }

    const postRendering = function () {
        blog.renderPosts();
    }

    const init = function () {
        postRendering();
        postAdding();
    }

    return {
        init: init
    }

})();

app.init();