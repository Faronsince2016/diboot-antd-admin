import { dibootApi } from '@/utils/request'
import moment from 'moment'

export default {
  data () {
    return {
      baseApi: '/',
      visible: false,
      model: {},
      title: '',
      spinning: false
    }
  },
  methods: {
    moment,
    async open (id) {
      const res = await dibootApi.get(`${this.baseApi}/${id}`)
      if (res.code === 0) {
        this.model = res.data
        this.title = '详情'
        this.visible = true
        this.afterOpen(id)
      } else {
        this.$notification.error({
          message: '获取详情信息失败',
          description: res.msg
        })
      }
    },
    downloadFile (path) {
      dibootApi.download(path)
        .then(res => {
          const blob = new Blob([res.data])
          if ('download' in document.createElement('a')) {
            // 非IE下载
            const elink = document.createElement('a')
            elink.download = res.filename
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, res.filename)
          }
        }).catch(err => {
          console.log(err)
        })
    },
    close () {
      this.visible = false
      this.model = {}
      this.afterClose()
    },
    /****
     * 打开详情之后的操作
     * @param id
     */
    afterOpen (id) {

    },
    afterClose () {

    }
  },
  props: {
    width: {
      type: Number,
      default: () => {
        return 720
      }
    }
  }
}
