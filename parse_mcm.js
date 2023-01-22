'use strict';

const fs = require('fs');

const request = require('request')

var url = [];

var index = 0;          
 
for (var idx=0;idx<url.length;++idx) {           
  request({url: url[idx], insecureHTTPParser: true}, (error, response, body)=>{

    if (error)
    {
      console.log(error);
    }
    else
    {
      index = index + 1;
      var logger0 = fs.createWriteStream('5-0.csv', index==1 ? {  flags: 'w' } : {  flags: 'a' });
      var logger2 = fs.createWriteStream('5-2.csv', index==1 ? {  flags: 'w' } : {  flags: 'a' });
      var logger3 = fs.createWriteStream('5-3.csv', index==1 ? {  flags: 'w' } : {  flags: 'a' });    
      
      console.log(response.request.href);

      console.log(index);

      let sc = JSON.parse(body);
      //console.log(sc);
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
              var is_3 = 0;
              var is_0 = 0;
              if (codeG.length>=3&&codeR.length>=2&&codeE.length>=3&&codeC.length>=2)
              {
                is_3 = 1;
              }
              if (codeG.length==0||codeR.length==0||codeE.length==0||codeC.length==0)
              {
                is_0 = 1;
              }
              //console.log(`${scs.no},${scs.mount},${is_3},${scs.lat},${scs.lng},${scs.satInfo.satinfoG.length},${codeG.length},${scs.satInfo.satinfoR.length},${codeR.length},${scs.satInfo.satinfoE.length},${codeE.length},${scs.satInfo.satinfoC.length},${codeC.length}\n`);
              if (is_3)
              {
                logger3.write(`${scs.no},${scs.mount},${is_3},${scs.lat},${scs.lng},${scs.satInfo.satinfoG.length},${codeG.length},${scs.satInfo.satinfoR.length},${codeR.length},${scs.satInfo.satinfoE.length},${codeE.length},${scs.satInfo.satinfoC.length},${codeC.length}\n`);
              }
              else if (is_0)
              {
                logger0.write(`${scs.no},${scs.mount},${is_3},${scs.lat},${scs.lng},${scs.satInfo.satinfoG.length},${codeG.length},${scs.satInfo.satinfoR.length},${codeR.length},${scs.satInfo.satinfoE.length},${codeE.length},${scs.satInfo.satinfoC.length},${codeC.length}\n`);
              }
              else
              {
                logger2.write(`${scs.no},${scs.mount},${is_3},${scs.lat},${scs.lng},${scs.satInfo.satinfoG.length},${codeG.length},${scs.satInfo.satinfoR.length},${codeR.length},${scs.satInfo.satinfoE.length},${codeE.length},${scs.satInfo.satinfoC.length},${codeC.length}\n`);
              }
          }
        }

        logger0.write(`${response.request.href}\n`);
        logger2.write(`${response.request.href}\n`);
        logger3.write(`${response.request.href}\n`);

        logger0.close();
        logger2.close();
        logger3.close();    

      }
  })
}
