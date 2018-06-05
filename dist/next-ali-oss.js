(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var Oss = global.OSS;

  var NxAliOss = nx.declare('nx.AliOss', {
    statics: {
      _instance: null,
      getInstance: function (inOssToken, inOptions) {
        return this._instance = this._instance || new NxAliOss(inOssToken, inOptions);
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
      init: function (inOssToken,inOptions) {
        this._client = new Oss.Wrapper(inOssToken);
        this._options = inOptions || { method: 'put' };
      },
      uploads: function (inArray) {
        var self = this;
        var method = this._options.method;
        var list = inArray.map(function (item) {
          var name = item.name;
          var file = item.file;
          return self._client[method](name, file, this._options);
        });
        return Promise.all(list);
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAliOss;
  }

}());
