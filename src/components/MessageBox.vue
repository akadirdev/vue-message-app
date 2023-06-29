<template>
  <div class="comment-box">
    <a-comment>
      <template #actions>
        <span key="comment-basic-like">
          <a-tooltip title="Like">
            <template v-if="action === 'liked'">
              <LikeFilled @click="like" />
            </template>
            <template v-else>
              <LikeOutlined @click="like" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <a-tooltip title="Dislike">
            <template v-if="action === 'disliked'">
              <DislikeFilled @click="dislike" />
            </template>
            <template v-else>
              <DislikeOutlined @click="dislike" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ dislikes }}
          </span>
        </span>
        <span key="comment-basic-reply-to">Reply to</span>
        <span key="comment-basic-delete">
          <a-popconfirm
            title="Mesaj silinsin mi？"
            okText="Sil"
            cancelText="İptal"
            @confirm="deleteMessage(messageObj)"
          >
            <template #icon
              ><question-circle-outlined style="color: red"
            /></template>
            <DeleteOutlined />
          </a-popconfirm>
        </span>
      </template>
      <template #author
        ><a style="margin-left: 10px">{{ messageObj.user }}</a></template
      >
      <template #avatar>
        <a-avatar
          size="large"
          :alt="messageObj.user"
          style="margin-left: 10px; margin-top: 5px"
        >
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </template>

      <template #content>
        <p style="margin-left: 10px">{{ messageObj.text }}</p>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ dayjs(messageObj.date).fromNow() }}</span>
        </a-tooltip>
      </template>
    </a-comment>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import {
  LikeFilled,
  LikeOutlined,
  DislikeFilled,
  DislikeOutlined,
  UserOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import { ref, defineEmits } from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const emit = defineEmits(['deleteMessage']);

const likes = ref(0);
const dislikes = ref(0);
const action = ref();

const like = () => {
  likes.value = 1;
  dislikes.value = 0;
  action.value = 'liked';
};

const dislike = () => {
  likes.value = 0;
  dislikes.value = 1;
  action.value = 'disliked';
};

const deleteMessage = (messageObj) => {
  emit('deleteMessage', messageObj);
};

defineProps(['messageObj']);
</script>
<style>
.comment-box {
}
</style>
