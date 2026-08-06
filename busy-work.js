const key='year8-footstool-busy-v1';const state=JSON.parse(localStorage.getItem(key)||'{}');const save=()=>localStorage.setItem(key,JSON.stringify(state));
document.querySelectorAll('[data-text]').forEach(el=>{el.value=state[el.dataset.text]||'';el.addEventListener('input',()=>{state[el.dataset.text]=el.value;save();});});
document.querySelectorAll('[data-select]').forEach(el=>{el.value=state[el.dataset.select]||'';el.addEventListener('change',()=>{state[el.dataset.select]=el.value;save();});});
document.querySelectorAll('.option-set button').forEach(el=>{if(state[el.parentElement.dataset.key]===el.dataset.value)el.classList.add('correct');el.addEventListener('click',()=>{state[el.parentElement.dataset.key]=el.dataset.value;save();el.parentElement.querySelectorAll('button').forEach(b=>b.classList.toggle('correct',b.dataset.value===el.dataset.value));});});
document.querySelector('#print-busy').addEventListener('click',()=>window.print());
