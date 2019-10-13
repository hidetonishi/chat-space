$(document).on('turbolinks:load', function(){
$(function() {
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  }
  function appendNoUser(user) {
    var html = `<div class='chat-group-user clearfix'>
                <p class='chat-group-user__name'>${user}</p>
                </div>`
    return html;
  }

  function addUser(userId,userName) {
  var html = `<div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${userId}'>
              <p class='chat-group-user__name'>${userName}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`;
  return(html);
    }

  $("#user-search-field").on("keyup", function() {
    $(".user-search-result").empty();
    var input = $("#user-search-field").val();
    var users_id = [];
    appendUser(users_id);
      $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input, group_users_id: users_id },
          dataType: 'json'
        })
        .done(function(users){
          
          if (users.length !== 0 && input.length !== 0 ) {
            users.forEach(function (user) {
              var html = appendUser(user);
              $(".user-search-result").append(html);
            });
          } else {
            var html = appendNoUser('一致するユーザーはありません')
            $(".user-search-result").append(html);
          }
        })
        .fail(function () {
          alert('ユーザー検索に失敗しました');
        })
      });
      $(document).on("click", ".user-search-add", function () {
          // $('.chat-group-users').val();
          var userId = $(this).data('user-id');
          var userName = $(this).data('user-name');
          var html = addUser(userId,userName);
          $(this).parent().remove();
          $('.chat-group-users').append(html);
          $("#user-search-field").get(0).reset()
        });
    
        $(document).on("click", ".user-search-remove", function () {
          $(this).parent().remove();
          $('.chat-group-users').append(html);
        });
    })
  });
