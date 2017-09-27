const app = (function () {

    let postId = 0;

    /**
     * Creates blog app controller.
     * @constructor
     */
    function Blog() {

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

                postsContainer.appendChild(addedPost.postView());
            } else {
                this.posts.forEach(elem => {
                    postsContainer.appendChild(elem.postView());
                });
            }
        }

        /**
         * Adds new post-object to the post's storage.
         */
        this.addPost = function () {
            modal(postEditBody());

        }.bind(this);

        const addPostBtn = document.getElementById('btn_add-post');

        addPostBtn.addEventListener('click', this.addPost);
    }

    function Post(id, heading, text) {
        this.id = id;
        this.heading = heading;
        this.text = text;
    }

    /**
     * Creates post HTML structure.
     */
    Post.prototype.postView = function () {

        let postFrag, li, header, body, btnRemove;

        postFrag = document.createDocumentFragment();

        li = document.createElement('li');
        li.className = 'post';

        header = document.createElement('header');
        header.className = 'post-header';
        header.innerHTML = this.heading;

        btnEdit = document.createElement('button');
        btnEdit.className = 'btn_edit-post';
        btnEdit.innerHTML = 'edit';

        btnRemove = document.createElement('button');
        btnRemove.className = 'btn_remove-post';
        btnRemove.innerHTML = 'X';

        body = document.createElement('div');
        body.className = 'post-body';
        body.innerHTML = this.text;

        li.appendChild(header);
        header.appendChild(btnRemove);
        header.appendChild(btnEdit);
        li.appendChild(body);

        postFrag.appendChild(li);

        btnRemove.addEventListener('click', () => {
            blog.posts.splice(getPostIndex.call(this), 1);

            li.remove();
        });

        btnEdit.addEventListener('click', () => {

            console.log(blog.posts[getPostIndex.call(this)]);
        });

        return postFrag;
    }

    function getPostIndex() {
        return blog.posts.findIndex((elem) => {
            if (elem.id === this.id) return elem;
        });
    }

    /**
     * @param  {function} f 
     */
    function modal(f) {
        let modalFrag, overlay, modalWindow, modalHeader, modalBody, btnClose, btnAccept, body, incomingData;

        incomingData = f;

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

        modalBody.appendChild(incomingData[0]);

        modalWindow.appendChild(modalBody);
        modalWindow.appendChild(btnAccept);
        modalHeader.appendChild(btnClose);

        modalFrag.appendChild(overlay);

        body.insertBefore(modalFrag, body.firstChild);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) this.remove();
        });

        btnAccept.addEventListener('click', () => {
            const postHeading = incomingData[1].innerHTML;
            const postContent = incomingData[2].innerHTML;

            blog.posts.push(new Post(postId++, postHeading, postContent));

            blog.appendPosts(true);
            overlay.remove();
        });

        btnClose.addEventListener('click', () => {
            overlay.remove();
        });
    }


    function postEditBody() {
        let postEditFrag, heading, content;

        postEditFrag = document.createDocumentFragment();

        heading = document.createElement('div');
        heading.className = 'post-heading';
        heading.setAttribute('contenteditable', 'true');

        content = document.createElement('div');
        content.className = 'post-content';
        content.setAttribute('contenteditable', 'true');

        postEditFrag.appendChild(heading);
        postEditFrag.appendChild(content);

        return [postEditFrag, heading, content];
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