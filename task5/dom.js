var user='Mr. Snow';
var dom=(function(){
    var template = document.getElementById('template');
    var tape = document.querySelector('main');

    Date.prototype.getMonthName = function () {
        return Date.locale.month_names[this.getMonth()];
    };

    Date.prototype.prettyFormat = function () {
        return (this.getDate()) + ' ' + this.getMonthName() + ' '+this.getFullYear()+' ' + this.getHours() + ':' + this.getMinutes();
    };

    Date.locale = {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };

    function empty(){
        tape.innerHTML='';
    }

    function removePhotoPost(id) {
        var found = document.getElementById(id);
        if (found){
            found.remove();
            modul.removePhotoPost(id);
            empty();
            displayPhotoPosts();
            return true;
        }
        else
            return false;
     }

    function editPhotoPost(id, photoPost) {
        var sucess = modul.editPhotoPost(id, photoPost);
        if (sucess) {
            var found = document.getElementById(id);
            if (found) found.parentNode.replaceChild(
                fillImages(modul.getPhotoPost(id)),
                found
            );
            return true;
        }
        return false;
    }

     function addPhotoPost(photoPost) {
        if (modul.addPhotoPost(photoPost)) {
            tape.appendChild(fillImages(photoPost));
            empty();
            displayPhotoPosts();
            return true;
        }
        return false;
    }

    function fillImages (photoPost){
         var copy = template.querySelector('.photopost.post').cloneNode(true);
         copy.id = photoPost.id;
         if (photoPost.photoLink)
             copy.querySelector('img').src = photoPost.photoLink;
         if(user===null||user===undefined){
             copy.querySelector('.buttondelete').style.display='none';
             copy.querySelector('.buttonedit').style.display='none';
             copy.querySelector('.buttonlike').style.display='none';
         }
         else
         if(user.toLowerCase()!==photoPost.author.toLowerCase()){
             copy.querySelector('.buttondelete').style.display='none';
             copy.querySelector('.buttonedit').style.display='none';
             }
         copy.querySelector('p').innerText = photoPost.descriprion;
         copy.querySelector('h5').innerText = photoPost.author + ' ' +
             photoPost.createdAt.prettyFormat();
         copy.querySelector('h2').innerText=photoPost.hashTags;
         return copy;
    }

    function displayPhotoPosts(skip = 0, top = 10, filterConfig) {
        var posts=modul.getPhotoPosts(skip,top,filterConfig);
        posts.forEach(element => {
            tape.appendChild(fillImages(element));
    });
    }

    function getuser(nickname){
        if(nickname!==null&&nickname!==undefined){
            user=nickname;
            document.querySelector('.mybutton.button_user').innerHTML=nickname+"<hr>Log out</a></h5>";
            empty();
            displayPhotoPosts();
        }
        if(nickname===undefined)
        {
            user=null;
            document.querySelector('.mybutton.button_user').innerHTML="Log"+"<hr>in</a></h5>";
            document.querySelector('addphoto').remove();
            empty();
            displayPhotoPosts();
        }
    }

    return {
        displayPhotoPosts,
        removePhotoPost,
        editPhotoPost,
        fillImages,
        addPhotoPost,
        getuser,
        empty
    }
})();
dom.getuser(user);
//dom.displayPhotoPosts();
