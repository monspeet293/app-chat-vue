<template>
    <div class="body">
        <div class="container clearfix">
            <div class="people-list" id="people-list">
                <div class="search">
                    <input type="text" placeholder="search" />
                    <i class="fa fa-search"></i>
                </div>
                <ul class="list">
                    <li class="clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
                            alt="avatar" />
                        <div class="about">
                            <div class="name">Vincent Porter</div>
                            <div class="status">
                                <i class="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>

                    <li class="clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg"
                            alt="avatar" />
                        <div class="about">
                            <div class="name">Aiden Chavez</div>
                            <div class="status">
                                <i class="fa fa-circle offline"></i> left 7 mins ago
                            </div>
                        </div>
                    </li>

                </ul>
            </div>

            <div class="chat">
                <div class="chat-header clearfix">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                        alt="avatar" />

                    <div class="chat-about">
                        <div class="chat-with">Chat with Vincent Porter</div>
                        <div class="chat-num-messages">already 1 902 messages</div>
                    </div>
                    <i class="fa fa-star"></i>
                </div> <!-- end chat-header -->

                <div class="chat-history">
                    <ul>
                        <li class="clearfix">
                            <div class="message-data align-right">
                                <span class="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                                <span class="message-data-name">Olia</span> <i class="fa fa-circle me"></i>

                            </div>
                            <div class="message other-message float-right">
                                Hi Vincent, how are you? How is the project coming along?
                            </div>
                        </li>

                        <li>
                            <div class="message-data">
                                <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                                <span class="message-data-time">10:12 AM, Today</span>
                            </div>
                            <div class="message my-message">
                                Are we meeting today? Project has been already finished and I have results to show you.
                            </div>
                        </li>

                        <li class="clearfix">
                            <div class="message-data align-right">
                                <span class="message-data-time">10:14 AM, Today</span> &nbsp; &nbsp;
                                <span class="message-data-name">Olia</span> <i class="fa fa-circle me"></i>

                            </div>
                            <div class="message other-message float-right">
                                Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have
                                you faced any problems at the last phase of the project?
                            </div>
                        </li>

                        <li>
                            <div class="message-data">
                                <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                                <span class="message-data-time">10:20 AM, Today</span>
                            </div>
                            <div class="message my-message">
                                Actually everything was fine. I'm very excited to show this to our team.
                            </div>
                        </li>

                        <li>
                            <div class="message-data">
                                <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                                <span class="message-data-time">10:31 AM, Today</span>
                            </div>
                            <i class="fa fa-circle online"></i>
                            <i class="fa fa-circle online" style="color: #AED2A6"></i>
                            <i class="fa fa-circle online" style="color:#DAE9DA"></i>
                        </li>

                    </ul>

                </div> <!-- end chat-history -->

                <div class="chat-message clearfix">
                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message"
                        rows="3"></textarea>

                    <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i class="fa fa-file-image-o"></i>

                    <button>Send</button>

                </div> <!-- end chat-message -->

            </div> <!-- end chat -->

        </div> <!-- end container -->

        <!-- <script id="message-template" type="text/x-handlebars-template">
  <li class="clearfix">
    <div class="message-data align-right">
      <span class="message-data-time" >{{time}}, Today</span> &nbsp; &nbsp;
      <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>
    </div>
    <div class="message other-message float-right">
      {{messageOutput}}
    </div>
  </li>
</script>

<script id="message-response-template" type="text/x-handlebars-template">
  <li>
    <div class="message-data">
      <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
      <span class="message-data-time">{{time}}, Today</span>
    </div>
    <div class="message my-message">
      {{response}}
    </div>
  </li>
</script> -->

    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:400,700);

:before,
:after {
    box-sizing: border-box;
}

body {
    background: #C5DDEB;
    font: 14px/20px "Lato", Arial, sans-serif;
    padding: 40px 0;
    color: white;
}

.container {
    margin: 0;
    width: 750px;
    background: #444753;
    border-radius: 5px;
    color: aliceblue;
}

.clearfix:after {

    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}

.people-list {
    width: 260px;
    float: left;
}

.people-list .search {
    padding: 20px;
}

.people-list input {
    border-radius: 3px;
    border: none;
    padding: 14px;
    color: white;
    background: #6A6C75;
    width: 90%;
    font-size: 14px;
}

.people-list .fa-search {
    position: relative;
    left: -25px;
}

.people-list ul {
    padding: 20px;
    height: 770px;
    list-style: none;
}



.people-list ul li {
    padding-bottom: 20px;
}

.people-list img {
    float: left;
}

.people-list .about {
    float: left;
    margin-top: 8px;
}

.people-list .about {
    padding-left: 8px;
}

.people-list .status {
    color: #92959E;
}

.chat {
    margin: 0;
    padding-right: auto;
    width: 490px;
    float: left;
    background: #F2F5F8;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    color: #434651;
}

.chat .chat-header {
    padding: 20px;
    border-bottom: 2px solid white;
}

.chat .chat-header img {
    float: left;
}

.chat .chat-header .chat-about {
    float: left;
    padding-left: 10px;
    margin-top: 6px;
}

.chat .chat-header .chat-with {
    font-weight: bold;
    font-size: 16px;
}

.chat .chat-header .chat-num-messages {
    color: #92959E;
}

.chat .chat-header .fa-star {
    float: right;
    color: #D8DADF;
    font-size: 20px;
    margin-top: 12px;
}


.chat .chat-history {
    padding: 30px 30px 20px;
    border-bottom: 2px solid white;
    overflow-y: scroll;
    height: 575px;
}

.chat .chat-history ul {
    list-style: none;
}

.chat .chat-history .message-data {
    margin-bottom: 15px;
}

.chat .chat-history .message-data-time {
    color: lighten(#92959E, 8%);
    padding-left: 6px;
}

.chat .message {
    color: white;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    margin-bottom: 30px;
    width: 90%;
    position: relative;
}

.chat .message :after {
    bottom: 100%;
    left: 7%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #86BB71;
    border-width: 10px;
    margin-left: -10px;
}


.chat .my-message {
    background: #86BB71;
}

.chat .other-message {
    background: #94C2ED;
    left: 93%;
}

.chat .other-message :after {
    border-bottom-color: #94C2ED;
    left: 93%;
}

/*aaaaaaaaaaa */
.chat-message {
    padding: 30px;
}

.chat-message textarea {
    width: 100%;
    border: none;
    padding: 10px 20px;
    font: 14px/22px "Lato", Arial, sans-serif;
    margin-bottom: 10px;
    border-radius: 5px;
    resize: none;

}

.chat-message .fa-file-o,
.fa-file-image-o {
    font-size: 16px;
    color: gray;
    cursor: pointer;

}

.chat-message button {
    float: right;
    color: #94C2ED;
    font-size: 16px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: #F2F5F8;
}

.chat-message button :hover {
    color: darken(#94C2ED, 7%);
}

/*aaaaaaaaaaa */
.me {
    margin-right: 3px;
    font-size: 10px;
}

.online {
    color: #86BB71;
}

.offline {
    color: #E38968;
}

.me {
    color: #94C2ED;
}

.align-left {
    text-align: left;
}

.align-right {
    text-align: right;
}

.float-right {
    float: right;
}
</style>