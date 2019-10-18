// $(document).on('turbolinks:load', function(){
  $(function(){
  function buildHTML(message) {

    var image = (message.image !== null) ? `<img class= "message__text__image" src="${message.image}">` : ''

    var html = 
        `<div class="message" data-message-id="${message.id}">
        <div class="message__upper-info">
        <p class="message__upper-info__talker">
              ${message.user_name}
        </p>
        <p class="message__upper-info__date">
              ${message.created_at}
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
  $('.new_message').on('submit', function(e){
    console.log(this)
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
    //自動更新
    var reloadMessages = function () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: "api/messages",
          type: "get",
          dataType: "json",
          data: {last_id: last_message_id}
        })
        .done(function (messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        })
        .fail(function(){
          alert('自動更新に失敗しています');
        });
      }
    };
    setInterval(reloadMessages, 5000);
  });
// });