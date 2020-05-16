export function parseOrderStatus(str) {
  let text = '无状态';
  let status = 'error';
  switch (str) {
    case 'cancel':
      text = '已取消';
      status = 'primary';
      break;
    case 'refunding':
      text = '退款中';
      status = 'primary';
      break;
    case 'refunded':
      text = '退款完成';
      status = 'primary';
      break;
    case 'success_payment':
      text = '支付成功';
      status = 'success';
      break;
    case 'waiting_payment':
      text = '等待支付';
      status = 'warning';
      break;
    case 'waiting_execution':
      text = '等待执行';
      status = 'warning';
      break;
    case 'executing':
      text = '执行中';
      status = 'primary';
      break;
    case 'execution_completed':
      text = '执行结束';
      status = 'success';
      break;
  }
  return {text, status};
}

export function parseRole(str) {
  switch (str) {
    case 'user':
      return '用户';
    case 'female':
      return '合伙人';
  }
}

export function parseGender(str) {
  switch (str) {
    case 'male':
      return '男';
    case 'female':
      return '女';
    case 'unknown':
      return '不详';
  }
}

export function parseEquipment(str) {
  switch (str) {
    case 'pass': {
      return '通过';
    }
    case 'fail': {
      return '不通过';
    }
    case 'wait': {
      return '待审核';
    }
    case 'modify': {
      return '待修改';
    }
  }
}

// export function parseOrder(str) {
//   switch (str) {
//     case 'pass': {
//       return '通过';
//     }
//     case 'fail': {
//       return '不通过';
//     }
//     case 'wait': {
//       return '待审核';
//     }
//     case 'modify': {
//       return '待修改';
//     }
//   }
// }

export function parseUser(str) {
  switch (str) {
    case 'normal': {
      return '已实名';
    }
    case 'forbid': {
      return '禁止';
    }
    case 'authentication': {
      return '未实名';
    }
    case 'modify': {
      return '待修改';
    }
  }
}

export function parseHtml(str) {
  return str.replace(/<[^>]*>/g, '').substring(0, 10);
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}
