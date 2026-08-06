import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.pdf':'application/pdf'};
createServer(async(req,res)=>{const raw=new URL(req.url,'http://localhost').pathname;const relative=raw==='/'?'index.html':raw.replace(/^\/+/, '');const path=normalize(join(process.cwd(),relative));if(!path.startsWith(process.cwd())){res.writeHead(403);res.end();return;}try{const body=await readFile(path);res.writeHead(200,{'content-type':types[extname(path)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}}).listen(8899);
