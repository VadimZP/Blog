const app = (function () {

    /** Variables */
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
        this.appendPosts = function (addNewPost) {
            if (!this.posts.length) return;

            const postsContainer = document.querySelector('.post-list');

            if (addNewPost) {
                const addedPost = this.posts[this.posts.length - 1];
                const postElem = addedPost.postView(addedPost.text);

                postsContainer.appendChild(postElem);
            } else {
                this.posts.forEach(elem => {
                    const postElem = elem.postView();

                    postsContainer.appendChild(postElem);
                });
            }
        }

        /**
         * Adds new post-object to the post's storage.
         */
        this.addPost = function () {
            _.posts.push(new Post(postId++));
<<<<<<< HEAD

=======
            
>>>>>>> test
            _.appendPosts(true);
        }

        this.setEventHandlers = function () {
            this.addPostBtn = document.getElementById('btn_add-post');

            this.addPostBtn.addEventListener('click', this.addPost);
        }
<<<<<<< HEAD

    }

    function Post(id) {
        this.id = id;
        this.heading = 'heading';
        this.text = 'text';
    }

    /**
     * Creates post HTML structure.
     * @param  {string} postText - text property from post-object
     */
    Post.prototype.postView = function () {

        /** Variables */
        let postDocFrag, li, header, body, btnRemove;

        postDocFrag = document.createDocumentFragment();

        li = document.createElement('li');
        li.className = 'post';

        header = document.createElement('header');
        header.className = 'post-header';
        header.innerHTML = this.heading;

        btnRemove = document.createElement('button');
        btnRemove.className = 'btn_remove-post';
        btnRemove.innerHTML = 'X';

        body = document.createElement('div');
        body.className = 'post-body';
        body.innerHTML = this.text;

        li.appendChild(header);
        header.appendChild(btnRemove);
        li.appendChild(body);

        postDocFrag.appendChild(li);

=======

    }

    function Post(id) {
        this.id = id;
        this.heading = 'heading';
        this.text = 'text';
    }

    /**
     * Creates post HTML structure.
     * @param  {string} postText - text property from post-object
     */
    Post.prototype.postView = function () {

        /** Variables */
        let postDocFrag, li, header, body, btnRemove;

        postDocFrag = document.createDocumentFragment();

        li = document.createElement('li');
        li.className = 'post';

        header = document.createElement('header');
        header.className = 'post-header';
        header.innerHTML = this.heading;

        btnRemove = document.createElement('button');
        btnRemove.className = 'btn_remove-post';
        btnRemove.innerHTML = 'X';

        body = document.createElement('div');
        body.className = 'post-body';
        body.innerHTML = this.text;

        li.appendChild(header);
        header.appendChild(btnRemove);
        li.appendChild(body);

        postDocFrag.appendChild(li);

>>>>>>> test
        btnRemove.addEventListener('click', () => {
            let result = blog.posts.findIndex((elem) => {
                if (elem.id === this.id) return elem;
            });
            blog.posts.splice(result, 1);
            li.remove();

        });

        return postDocFrag;
    }

    // Initialization step
    const blog = new Blog();

    const postAdding = function () {
        blog.setEventHandlers();
    }

    const postRendering = function () {
        blog.appendPosts();
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