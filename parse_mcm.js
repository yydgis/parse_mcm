'use strict';

const fs = require('fs');

var logger = fs.createWriteStream('5.txt', {
  flags: 'w' // 'a' means appending (old data will be preserved)
});
let rawdata = fs.readFileSync('5.csv');
let sc = JSON.parse(rawdata);
console.log(sc);
var n = sc.length;
for (var i=0;i<n;++i)
{
    var scs = sc[i];
    if (scs.hasOwnProperty('mount'))
    {
        //logger.write(`${scs.id},${scs.location.lat},${scs.location.lng}\n`)
        var satInfoG = scs.satInfo.satinfoG;
        var satInfoR = scs.satInfo.satinfoR;
        var satInfoE = scs.satInfo.satinfoE;
        var satInfoC = scs.satInfo.satinfoC;

        var satInfo = scs.satInfo.satinfoG;
        var code = [];
        for (var j=0;j<satInfo.length;++j)
        {
          var cur_sat = satInfo[j];
          for (var k=0;k<cur_sat.code.length;++k)
          {
            if (!code.includes(cur_sat.code[k]))
              code.push(cur_sat.code[k]);
          }
        }
        var codeG = code;

        var satInfo = scs.satInfo.satinfoR;
        var code = [];
        for (var j=0;j<satInfo.length;++j)
        {
          var cur_sat = satInfo[j];
          for (var k=0;k<cur_sat.code.length;++k)
          {
            if (!code.includes(cur_sat.code[k]))
              code.push(cur_sat.code[k]);
          }
        }
        var codeR = code;

        var satInfo = scs.satInfo.satinfoE;
        var code = [];
        for (var j=0;j<satInfo.length;++j)
        {
          var cur_sat = satInfo[j];
          for (var k=0;k<cur_sat.code.length;++k)
          {
            if (!code.includes(cur_sat.code[k]))
              code.push(cur_sat.code[k]);
          }
        }
        var codeE = code;

        var satInfo = scs.satInfo.satinfoC;
        var code = [];
        for (var j=0;j<satInfo.length;++j)
        {
          var cur_sat = satInfo[j];
          for (var k=0;k<cur_sat.code.length;++k)
          {
            if (!code.includes(cur_sat.code[k]))
              code.push(cur_sat.code[k]);
          }
        }
        var codeC = code;
        var is_triple_band = 0;
        if (codeG.length>=3&&codeR.length>=2&&codeE.length>=3&&codeC.length>=2)
        is_triple_band = 1;
        console.log(`${scs.no},${scs.mount},${is_triple_band},${scs.lat},${scs.lng},${scs.satInfo.satinfoG.length},${codeG.length},${scs.satInfo.satinfoR.length},${codeR.length},${scs.satInfo.satinfoE.length},${codeE.length},${scs.satInfo.satinfoC.length},${codeC.length}\n`);
        if (is_triple_band)
          logger.write(`${scs.no},${scs.mount},${is_triple_band},${scs.lat},${scs.lng},${scs.satInfo.satinfoG.length},${codeG.length},${scs.satInfo.satinfoR.length},${codeR.length},${scs.satInfo.satinfoE.length},${codeE.length},${scs.satInfo.satinfoC.length},${codeC.length}\n`);
    }
}
logger.close();