var heart = document.getElementsByClassName("fa fa-heart");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");


Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const heart = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        str = name.replace(/[-]/gi, '');
        str2 = msg.replace(/["]+/g, '');
        fetch('heart', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': str,
            'msg': str2,
            'heart': 1
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const heart = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        str = name.replace(/[-]/gi, '');
        str2 = msg.replace(/["]+/g, '');
        fetch('thumbDown', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': str,
            'msg': str2,
            'heart': - 1
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        str = name.replace(/[-]/gi, '');
        str2 = msg.replace(/["]+/g, '');
        console.log(str ,"str")
        console.log(str2, "str2")
        console.log(name, "name");
        console.log(msg, "msg")
        fetch('books', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': str,
            'msg': str2
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
