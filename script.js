const STORAGE_KEY = 'academicTasks_v2';

const CATEGORY_META = {
  '实习':     { color:'#E23D0A' },
  '求职秋招': { color:'#8D6FD1' },
  '考编':     { color:'#C43206' },
  '考试':     { color:'#B69CE3' },
  '补考重修': { color:'#1C1A1E' },
  '论文':     { color:'#5A5560' },
  '语言学习': { color:'#D98E6B' },
  '学习方法': { color:'#9F8FBF' }
};

const PRIORITY_META = {
  '紧急': { color:'#E23D0A', order:0 },
  '高':   { color:'#C43206', order:1 },
  '中':   { color:'#8D6FD1', order:2 },
  '低':   { color:'#5A5560', order:3 }
};

function uid(){ return 't_' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

function getDefaultTasks(){
  const base = [
    /* —— 本周必须落实 —— */
    { title:'实习盖章落实', category:'实习', priority:'紧急', deadline:'2026-09-18',
      note:'两条路：网上正规渠道 或 直接问舅舅。这周内定下来，别拖到影响备考。定好后立刻开始写实习日志（需≥6周，建议每日简记）。' },
    { id:'task_sz_01', title:'毕业实习开始', category:'实习', priority:'高', deadline:'2026-09-18',
      note:'毕业实习正式启动' },
    { id:'task_sz_02', title:'毕业实习结束', category:'实习', priority:'高', deadline:'2027-03-05',
      note:'实习结束（本专业要求最少满6周）' },
    { id:'task_sz_03', title:'提交毕业实习材料', category:'实习', priority:'高', deadline:'2027-03-12',
      note:'向辅导员交齐：鉴定表、承诺书、周日志5篇、5000字报告、成绩表' },
    { title:'补考冲刺复习', category:'补考重修', priority:'紧急', deadline:'2026-09-16',
      note:'当前最高优先级，确保通过。考完立刻切换到考编备考。' },
    { title:'问清秋招线上通道 & 开始线上投递', category:'求职秋招', priority:'高', deadline:'2026-09-15',
      note:'问辅导员或学校就业网：双选会很多单位同步开网申。已有两版简历，现在就可以线上投，不必等现场。' },
    { title:'开始每日刷行测 + 申论', category:'考编', priority:'高', deadline:'2026-11-29',
      note:'不用等公告，考试内容早就确定。现在开始正好对上 2 个多月备考窗口。建议每天 1 套行测模块 + 每周 1 篇申论。' },
    { title:'看去年职位表摸底', category:'考编', priority:'中', deadline:'2026-09-20',
      note:'2026 国考、重庆省考职位表现在就能查。看"经济统计学"去年能报哪些岗位、竞争比多少，心里先有底。' },
    { title:'考编资料购买', category:'考编', priority:'高', deadline:'2026-09-20',
      note:'第二周周末购买教辅和真题，提前了解考试大纲与题型。' },
    { title:'2027 国考新公告：下载职位表 Excel', category:'考编', priority:'高', deadline:'2026-10-15',
      note:'10 月中旬公告发布后，第一时间下载职位表 Excel 发给助手，帮你筛"经济统计学对口 + 限应届"的岗位。' },
    /* —— 中期 —— */
    { title:'毕业论文选题与大纲', category:'论文', priority:'中', deadline:'2026-11-15',
      note:'确定研究方向，收集文献，逐步完善大纲。可以结合市调 / 建模竞赛的课题延伸。' },
    { id:'task_sz_04', title:'网上论文选题截止', category:'论文', priority:'高', deadline:'2027-01-05',
      note:'登录系统务必完成网上论文选题' },
    { id:'task_sz_05', title:'接收论文任务书', category:'论文', priority:'中', deadline:'2027-01-15',
      note:'接收指导教师下达的毕业论文任务书' },
    { id:'task_sz_06', title:'提交开题报告', category:'论文', priority:'中', deadline:'2027-03-20',
      note:'完成并提交开题报告' },
    { id:'task_sz_07', title:'提交毕业论文初稿', category:'论文', priority:'高', deadline:'2027-04-05',
      note:'完成并提交毕业论文初稿' },
    { id:'task_sz_08', title:'毕业论文中期检查', category:'论文', priority:'中', deadline:'2027-04-20',
      note:'配合完成毕业论文中期检查' },
    { id:'task_sz_09', title:'论文定稿与答辩', category:'论文', priority:'高', deadline:'2027-05-20',
      note:'提交毕业论文定稿并参加毕业论文答辩' },
    { id:'task_sz_10', title:'提交论文装订材料', category:'论文', priority:'高', deadline:'2027-06-10',
      note:'按要求整理并提交毕业论文装订材料（含正本及附件）' },
    { title:'六级真题刷题', category:'考试', priority:'高', deadline:'2026-12-12',
      note:'12 月考试，11 月底开始集中刷真题，重点突破阅读和翻译，听力写作适当保持即可。' },
    { title:'数分 & 高代重修备考', category:'补考重修', priority:'高', deadline:'2027-06-20',
      note:'明年 6 月下旬两门重修。提前复习，注意题型变化；范围不确定时先掌握基础题型，再试探性练习原题。' },
    /* —— 长期 —— */
    { title:'小语种学习计划', category:'语言学习', priority:'低', deadline:'',
      note:'结合专业或兴趣选一门，提前规划，长期坚持，不追求速成。' },
    { title:'抽象课程学习法', category:'学习方法', priority:'低', deadline:'',
      note:'数分、高代：先理解基本概念，再通过大量练习巩固，避免死记硬背。' },
    { title:'历年真题整理', category:'学习方法', priority:'低', deadline:'',
      note:'总结题型与解题思路，形成专属"题型库"。' },
    { title:'错题本复盘', category:'学习方法', priority:'低', deadline:'',
      note:'定期复习错题本，归纳错误原因，考前重点回顾。' }
  ];
  return base.map(t => ({ id: uid(), completed:false, createdAt: Date.now(), ...t }));
}

/* ---------- 状态 ---------- */
let tasks = loadTasks();
let currentView = 'grid';
let filters = { category:'all', priority:'all', search:'' };

function loadTasks(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw){ try{ return JSON.parse(raw); }catch(e){} }
  return getDefaultTasks();
}
function saveTasks(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }

/* ---------- DOM ---------- */
const $ = id => document.getElementById(id);
const els = {
  openAddBtn:$('openAddBtn'), modalOverlay:$('modalOverlay'), modalCloseBtn:$('modalCloseBtn'),
  cancelBtn:$('cancelBtn'), modalTitle:$('modalTitle'), taskForm:$('taskForm'), taskId:$('taskId'),
  taskTitleInput:$('taskTitle'), taskCategoryInput:$('taskCategory'), taskPriorityInput:$('taskPriority'),
  taskDeadlineInput:$('taskDeadline'), taskNoteInput:$('taskNote'), categoryTabs:$('categoryTabs'),
  priorityFilter:$('priorityFilter'), searchInput:$('searchInput'), gridBtn:$('gridBtn'),
  timelineBtn:$('timelineBtn'), gridView:$('gridView'), timelineView:$('timelineView'),
  emptyState:$('emptyState'), statTotal:$('statTotal'), statDone:$('statDone'),
  statPending:$('statPending'), statPercent:$('statPercent'), ringFg:$('ringFg'), toast:$('toast')
};

/* ---------- 初始化 ---------- */
renderCategoryTabs(); bindEvents(); render();

function bindEvents(){
  els.openAddBtn.addEventListener('click', () => openModal());
  els.modalCloseBtn.addEventListener('click', closeModal);
  els.cancelBtn.addEventListener('click', closeModal);
  els.modalOverlay.addEventListener('click', e => { if(e.target === els.modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
  els.taskForm.addEventListener('submit', handleSubmit);
  els.categoryTabs.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn'); if(!btn) return;
    filters.category = btn.dataset.cat; renderCategoryTabs(); render();
  });
  els.priorityFilter.addEventListener('change', e => { filters.priority = e.target.value; render(); });
  els.searchInput.addEventListener('input', e => { filters.search = e.target.value.trim().toLowerCase(); render(); });
  els.gridBtn.addEventListener('click', () => switchView('grid'));
  els.timelineBtn.addEventListener('click', () => switchView('timeline'));
  els.gridView.addEventListener('click', handleCardAction);
  els.timelineView.addEventListener('click', handleCardAction);
}

function renderCategoryTabs(){
  const cats = ['all', ...Object.keys(CATEGORY_META)];
  els.categoryTabs.innerHTML = cats.map(c =>
    `<button class="tab-btn ${filters.category===c?'active':''}" data-cat="${c}">${c==='all'?'全部':c}</button>`
  ).join('');
}

function switchView(view){
  currentView = view;
  els.gridBtn.classList.toggle('active', view==='grid');
  els.timelineBtn.classList.toggle('active', view==='timeline');
  els.gridView.classList.toggle('hidden', view!=='grid');
  els.timelineView.classList.toggle('hidden', view!=='timeline');
  render();
}

function handleCardAction(e){
  const btn = e.target.closest('[data-action]'); if(!btn) return;
  const { id, action } = btn.dataset;
  if(action==='toggle') toggleComplete(id);
  if(action==='edit') openModal(id);
  if(action==='delete') deleteTask(id);
}

/* ---------- 筛选排序 ---------- */
function getFilteredTasks(){
  return tasks.filter(t => {
    if(filters.category!=='all' && t.category!==filters.category) return false;
    if(filters.priority!=='all' && t.priority!==filters.priority) return false;
    if(filters.search && !(t.title+' '+(t.note||'')).toLowerCase().includes(filters.search)) return false;
    return true;
  });
}
function sortByPriorityThenDate(list){
  return [...list].sort((a,b) => {
    const pa=(PRIORITY_META[a.priority]||{order:9}).order, pb=(PRIORITY_META[b.priority]||{order:9}).order;
    if(pa!==pb) return pa-pb;
    if(a.deadline && b.deadline) return a.deadline.localeCompare(b.deadline);
    return a.deadline ? -1 : b.deadline ? 1 : 0;
  });
}

/* ---------- 渲染 ---------- */
function render(){
  const filtered = getFilteredTasks();
  els.emptyState.classList.toggle('hidden', filtered.length>0);
  currentView==='grid' ? renderGrid(filtered) : renderTimeline(filtered);
  renderStats();
}
function renderGrid(list){
  els.gridView.innerHTML = sortByPriorityThenDate(list).map((t,i)=>createCard(t,i*30)).join('');
}
function createCard(task, delay=0){
  const cat = CATEGORY_META[task.category] || { color:'#999' };
  const pr = PRIORITY_META[task.priority] || { color:'#999' };
  const dl = getDeadlineInfo(task.deadline);
  return `
  <div class="task-card ${task.completed?'completed':''}" style="--accent:${cat.color};animation-delay:${delay}ms">
    <div class="card-top">
      <span class="chip chip-cat">${task.category}</span>
      <span class="chip chip-pr" style="color:${pr.color}">${task.priority}</span>
    </div>
    <div class="task-title">${esc(task.title)}</div>
    <div class="task-note" ${task.note?'':'style="opacity:.35"'}>${task.note?esc(task.note):'暂无备注'}</div>
    <div class="card-footer">
      <span class="deadline-tag ${dl.cls}">${dl.text}</span>
      <div class="card-actions">
        <button class="icon-btn check ${task.completed?'checked':''}" data-action="toggle" data-id="${task.id}" title="标记完成">${task.completed?'✔':'○'}</button>
        <button class="icon-btn" data-action="edit" data-id="${task.id}" title="编辑">✎</button>
        <button class="icon-btn delete" data-action="delete" data-id="${task.id}" title="删除">✕</button>
      </div>
    </div>
  </div>`;
}
function renderTimeline(list){
  const dated = list.filter(t=>t.deadline).sort((a,b)=>a.deadline.localeCompare(b.deadline));
  const undated = list.filter(t=>!t.deadline);
  let html = '<div class="timeline-inner">' + dated.map((t,i)=>`
    <div class="timeline-item" style="animation-delay:${i*40}ms">
      <span class="timeline-dot" style="background:${(CATEGORY_META[t.category]||{color:'#999'}).color}"></span>
      <div class="timeline-date">${formatDateFull(t.deadline)}</div>
      ${createCard(t)}
    </div>`).join('') + '</div>';
  if(undated.length){
    html += `<div class="timeline-longterm"><div class="longterm-heading">长期持续任务</div>
      <div class="longterm-grid">${undated.map(t=>createCard(t)).join('')}</div></div>`;
  }
  els.timelineView.innerHTML = html;
}

/* ---------- 工具 ---------- */
function esc(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function getDeadlineInfo(deadline){
  if(!deadline) return { text:'长期任务', cls:'muted' };
  const today=new Date(); today.setHours(0,0,0,0);
  const d=new Date(deadline+'T00:00:00');
  const diff=Math.round((d-today)/86400000);
  const s=`${d.getMonth()+1}月${d.getDate()}日`;
  if(diff<0)  return { text:`${s} · 已过期 ${Math.abs(diff)} 天`, cls:'overdue' };
  if(diff===0)return { text:`${s} · 今天截止`, cls:'today' };
  if(diff<=3) return { text:`${s} · 还剩 ${diff} 天`, cls:'soon' };
  return { text:`${s} · 还剩 ${diff} 天`, cls:'normal' };
}
function formatDateFull(deadline){
  const d=new Date(deadline+'T00:00:00');
  const w=['周日','周一','周二','周三','周四','周五','周六'];
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')} · ${w[d.getDay()]}`;
}

/* ---------- 统计 ---------- */
function renderStats(){
  const total=tasks.length, done=tasks.filter(t=>t.completed).length;
  const pct = total ? Math.round(done/total*100) : 0;
  els.statTotal.textContent=total; els.statDone.textContent=done;
  els.statPending.textContent=total-done; els.statPercent.textContent=pct+'%';
  const c=2*Math.PI*34;
  els.ringFg.style.strokeDasharray=c;
  els.ringFg.style.strokeDashoffset=c-(pct/100*c);
}

/* ---------- 增删改 ---------- */
function toggleComplete(id){
  const t=tasks.find(x=>x.id===id); if(!t) return;
  t.completed=!t.completed; saveTasks(); render();
  toast(t.completed?'任务已完成 ✓':'已标记为未完成');
}
function deleteTask(id){
  const t=tasks.find(x=>x.id===id); if(!t) return;
  if(!confirm(`确定删除「${t.title}」？`)) return;
  tasks=tasks.filter(x=>x.id!==id); saveTasks(); render(); toast('任务已删除');
}
function openModal(id){
  els.taskForm.reset();
  if(id){
    const t=tasks.find(x=>x.id===id); if(!t) return;
    els.modalTitle.textContent='编辑任务';
    els.taskId.value=t.id; els.taskTitleInput.value=t.title;
    els.taskCategoryInput.value=t.category; els.taskPriorityInput.value=t.priority;
    els.taskDeadlineInput.value=t.deadline||''; els.taskNoteInput.value=t.note||'';
  }else{
    els.modalTitle.textContent='新建任务'; els.taskId.value=''; els.taskPriorityInput.value='中';
  }
  els.modalOverlay.classList.add('open');
  setTimeout(()=>els.taskTitleInput.focus(),100);
}
function closeModal(){ els.modalOverlay.classList.remove('open'); }
function handleSubmit(e){
  e.preventDefault();
  const id=els.taskId.value, title=els.taskTitleInput.value.trim();
  if(!title){ toast('请输入任务标题'); return; }
  const data={ title, category:els.taskCategoryInput.value, priority:els.taskPriorityInput.value,
    deadline:els.taskDeadlineInput.value, note:els.taskNoteInput.value.trim() };
  if(id){ const t=tasks.find(x=>x.id===id); if(t) Object.assign(t,data); toast('任务已更新'); }
  else { tasks.push({ id:uid(), completed:false, createdAt:Date.now(), ...data }); toast('任务已创建'); }
  saveTasks(); closeModal(); render();
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg){
  clearTimeout(toastTimer);
  els.toast.textContent=msg; els.toast.classList.add('show');
  toastTimer=setTimeout(()=>els.toast.classList.remove('show'),2200);
}