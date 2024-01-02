<script lang="ts">
  import Editor  from '@tinymce/tinymce-svelte';
  import { env } from '$env/dynamic/public';

  export let html: string = "";

  export let conf: EditorOptions = {
    menubar: false,
    plugins: "quickbars emoticons lists wordcount autosave",
    toolbar: [ 
      'bold italic strikethrough underline | blockquote hr | emoticons | align numlist bullist | undo redo',
      'fontfamily | blocks h1 h2 h3  | backcolor forecolor',
    ],
    quickbars_selection_toolbar: 'blocks | bold italic | blockquote | alignleft aligncenter alignright | forecolor',
    inline: true,
    quickbars_insert_toolbar: '',
    content_css: 'default',
    skin: "oxide-dark",
 }

</script>

<div class="editor">
  <Editor
    apiKey="{env.PUBLIC_TINY_EDITOR_KEY}"
    inline=true
    bind:value={html}
    conf={conf}
  />
</div>

<style lang="postcss">
  .editor {
    width: 100%;
    @apply mt-1
  }
</style>
