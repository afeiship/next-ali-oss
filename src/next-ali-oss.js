(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var Oss = global.OSS;

  var NxAliOss = nx.declare('nx.AliOss', {
    statics: {
      _instance: null,
      getInstance: function (inOssToken) {
        return this._instance = this._instance || new NxAliOss(inOssToken);
      }
    },
    properties: {
      client: {
        get: function () {
          return this._client || null;
        }
      }
    },
    methods: {
      init: function (inOssToken) {
        this._client = new Oss.Wrapper(inOssToken);
      },
      uploads: function (inArray) {
        var self = this;
        var list = inArray.map(function (item) {
          var name = item.name;
          var file = item.file;
          var options = item.options;
          return self._client.multipartUpload(name, file, options);
        });
        return Promise.all(list);
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAliOss;
  }

}());
