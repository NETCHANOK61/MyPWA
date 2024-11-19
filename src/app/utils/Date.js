// dd/mm/yyyy
const dateViewShort = _date => {
  const d = new Date(_date);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear() + 543;
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};

const formatDate = date => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear() + 543;

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};

const formatTime = date => {
  const d = new Date(date);
  let hh = '' + d.getHours(),
    min = '' + d.getMinutes();

  if (hh.length < 2) hh = '0' + hh;
  if (min.length < 2) min = '0' + min;
  return hh + ':' + min;
};

// yyyy/mm/dd
const dateNowEn = () => {
  const d = new Date();
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
};

const dateNowTh = () => {
  const d = new Date();
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear() + 543;
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};

const dateNowThBack = _day => {
  const d = new Date(Date.now() - _day * 24 * 60 * 60 * 1000);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear() + 543;
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};

//hh:mm
const timeNow = () => {
  const d = new Date();
  let hh = '' + d.getHours(),
    mm = '' + d.getMinutes();
  if (hh.length < 2) hh = '0' + hh;
  if (mm.length < 2) mm = '0' + mm;
  return [hh, mm].join(':');
};

//hh:mm
const convertTimeNowFormate = _date => {
  const d = new Date(_date);
  let hh = '' + d.getHours(),
    mm = '' + d.getMinutes();
  if (hh.length < 2) hh = '0' + hh;
  if (mm.length < 2) mm = '0' + mm;
  return [hh, mm].join(':');
};

// begin chang Formate
// yyyy/mm/dd
const convertFormateEn = _date => {
  const arr = _date.split('/');
  return [arr[2] - 543, arr[1], arr[0]].join('/');
};

// yyyy-mm-dd
const convertFormateEn2 = _date => {
  const arr = _date.split('/');
  return [arr[2] - 543, arr[1], arr[0]].join('-');
};

//dd/mm/yyyy
const convertFormateEn3 = _date => {
  const arr = _date.split('/');
  return [arr[0], arr[1], arr[2] - 543].join('/');
};

//yyyymmdd
const formateDateyyyymmdd = _date => {
  const arr = _date.split('/');
  return [arr[2] - 543, arr[1], arr[0]].join('');
};

// End Chang Formate

// from yyyymmdd to date th
const convertDateServiceToDateTh = _date => {
  const dd = '' + _date.substr(6, 2),
    mm = '' + _date.substr(4, 2),
    yyyy = parseInt(_date.substr(0, 4)) + 543;
  return [dd, mm, yyyy].join('/');
};
// dateadd 0
const stringTime = (_hh, _mm) => {
  let hh = '' + _hh,
    mm = '' + _mm;

  if (hh.length < 2) hh = '0' + hh;
  if (mm.length < 2) mm = '0' + mm;

  return [hh, mm].join(':');
};
export {
  dateViewShort,
  dateNowEn,
  timeNow,
  formatDate,
  formatTime,
  dateNowTh,
  dateNowThBack,
  convertFormateEn,
  formateDateyyyymmdd,
  convertDateServiceToDateTh,
  convertTimeNowFormate,
  convertFormateEn2,
  convertFormateEn3,
  stringTime,
};
