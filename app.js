const app = (function () {

    /** Variables */
    let postId = 0;

    let data = [{
        posts: []
    }];

    /**
     * Creates blog app controller.
     * @constructor
     */
    function Blog() {
        /**
         * Output posts to the page from storage.
         * @param  {boolean} addNewPost - if true, add newly created post
         */
        this.appendPosts = function (addNewPost) {
            if (!data[0].posts.length) return;

            const postsContainer = document.querySelector('.post-list');

            if (addNewPost) {
                const addedPost = data[0].posts[data[0].posts.length - 1];
                const postElem = addedPost.postView();

                postsContainer.appendChild(postElem);
            } else {
                data[0].posts.forEach(elem => {
                    const postElem = elem.postView();

                    postsContainer.appendChild(postElem);
                });
            }
        }

        /**
         * Adds new post-object to the post's storage.
         */
        this.addPost = function () {
            modal();
            data[0].posts.push(new Post(postId++));

            this.appendPosts(true);
        }.bind(this);

        this.addPostBtn = document.getElementById('btn_add-post');

        this.addPostBtn.addEventListener('click', this.addPost);
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

        let postFrag, li, header, body, btnRemove;

        postFrag = document.createDocumentFragment();

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

        postFrag.appendChild(li);

        btnRemove.addEventListener('click', () => {
            let postIndex = data[0].posts.findIndex((elem) => {
                if (elem.id === this.id) return elem;
            });

            data[0].posts.splice(postIndex, 1);

            li.remove();
        });

        return postFrag;
    }

    function modal() {
        let modalFrag, overlay, modalWindow, modalHeader, modalBody, btnClose, btnAccept, body;

        body = document.body;

        modalFrag = document.createDocumentFragment();

        overlay = document.createElement('div');
        overlay.className = 'overlay';

        modalWindow = document.createElement('div');
        modalWindow.className = 'modal-window';

        modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';

        modalBody = document.createElement('div');
        modalBody.className = 'modal-body';

        btnClose = document.createElement('button');
        btnClose.className = 'btn_close-modal';
        btnClose.innerHTML = 'X';

        btnAccept = document.createElement('button');
        btnAccept.className = 'btn_accept';
        btnAccept.innerHTML = 'Accept';

        overlay.appendChild(modalWindow);
        modalWindow.appendChild(modalHeader);
        modalWindow.appendChild(modalBody);
        modalWindow.appendChild(btnAccept);
        modalHeader.appendChild(btnClose);

        modalFrag.appendChild(overlay);
        
        body.insertBefore(modalFrag, body.firstChild);

    }

    // Initialization step
    const blog = new Blog();

    const init = function () {
        blog.appendPosts();
    }

    return {
        init: init
    }

})();

app.init();