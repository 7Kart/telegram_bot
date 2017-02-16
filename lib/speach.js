const tkMake = "http://www.liuxiatool.com/t.php?sl=ru&tl=zh-CN&q=%D0%B0%D0%B7%D0%B0%D0%B7%D0%B0&p=2&method=get&type=output&tijioao=submit"
const request = require("request");
const keyString = "tk value :";
const fs = require("fs");


exports.makeAudio = function(str,userId, cb){
    console.log("str", str);
    var testWord = str;
    var lang = "ru";
    var url = MakeTkUrl(testWord, lang);
    var file = userId+(new Date().getTime())+".mp3";

    request({uri:url, method:'GET', encoding:'binary'},
        function (err, res, page) {

            var tkIndex = 1*page.search("tk value :")+keyString.length;
            var tk = page.substring(tkIndex, page.indexOf("<", tkIndex));
            var options = {
                url: makeURL(testWord, tk, lang),
                headers: {
                    'Referer': 'http://translate.google.com/',
                    'User-Agent': 'stagefright/1.2 (Linux;Android 5.0)'
                },
                encoding: null
            };

            var stream = request(options)
                .pipe(fs.createWriteStream(file));
            stream.on('finish', function () {
                cb(file);
            });

            // cb(new Buffer(sound))
        });
};

function MakeTkUrl(word, lg){
  var encWord = encodeURIComponent(word);
  return "http://www.liuxiatool.com/t.php?sl="+lg+"&tl=zh-CN&q="+encWord+"&p=2&method=get&type=output&tijioao=submit"
}


function makeURL(word, tk, lang){
  var encWord = encodeURIComponent(word)
  return "https://translate.google.ru/translate_tts?ie=UTF-8&q="+encWord+"&tl="+lang+"&total=1&idx=0&textlen="+word.length+"&tk="+tk+"&client=t&prev=input"
}
