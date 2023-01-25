<script setup>

</script>

<template>

</template>

<script>
export default defineComponent({
  components: {
  },
  data() {
  },
  methods: {
    getBucketFile() {
      this.$s3.listBuckets((err, data) => {
        if (!err) {
          console.log(data)
        }
      })
      this.$s3.listObjectsV2({ Bucket: "docs-bucket", MaxKeys: 10 }, (err, data) => {
        if (!err) {
          console.log(data.KeyCount)
          data.Contents.forEach((o) => {
            console.log(o)
          })
        }
      })
      this.$s3.headObject({
        Bucket: "docs-bucket",
        Key: "install-k8s-with-kubeadm/README.md",
      }, (err, data) => {
        if (!err) {
          console.log(data)
          console.log("ipfs cid:    ", data.Metadata['ipfs-hash'])
          // if synced to arweave
          console.log("arweave hash:", data.Metadata['arweave-hash'])
        }
      })
      this.$s3.getObject({
        Bucket: "docs-bucket",
        Key: "install-k8s-with-kubeadm/README.md",
      }, (err, data) => {
        if (!err) {
          var reader = data.Body.getReader()
          let charsReceived = 0
          let result = ''
          reader.read().then(function processText({ done, value }) {
            // Result objects contain two properties:
            // done  - true if the stream has already given you all its data.
            // value - some data. Always undefined when done is true.
            var text = new TextDecoder().decode(value);
            console.log(done, text)
            if (done) {
              return;
            }
            // value for fetch streams is a Uint8Array
            charsReceived += value.length;
            // Read some more, and call this function again
            return reader.read().then(processText);
          });
        }
      })
    }
  }
})
</script>

<style scoped>
</style>
