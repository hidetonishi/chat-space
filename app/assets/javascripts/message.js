$(function(){
  function buildHTML(message) {

    var image = (message.image !== null) ? `<img class= "message__text__image" src="${message.image}">` : ''

    var html = 
        `<div class="message">
        <div class="message__upper-info">
        <p class="message__upper-info__talker">
              ${message.user_name}
        </p>
        <p class="message__upper-info__date">
              ${message.date}
        </p>
        </div>
        <p class="message__text">
              ${message.content}
        <img class="message__text__image" src= >
              ${image}
        </p>
        </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.new_message')[0].reset()
      $("submit-btn").prop("disabled", false)
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    });
    return false;
  });
});