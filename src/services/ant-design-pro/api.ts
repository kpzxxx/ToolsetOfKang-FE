// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

const URL = 'http://47.98.126.132:8090';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(URL + '/user/login/current', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'AABBCC',
    },
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(URL + '/user/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'AABBCC',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function getWords(options?: { [key: string]: any }) {
  return request<Record<string, any>>(URL + '/word/get', {
    method: 'GET',
    ...(options || {}),
    headers: {
      Authorization: 'AABBCC',
    },
  });
}

export async function saveWord(word: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>(URL + '/word/save', {
    method: 'POST',
    ...(options || {}),
    headers: {
      Authorization: 'AABBCC',
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: word,
  });
}

export async function deleteWord(words: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>(URL + '/word/delete?word=' + words, {
    method: 'DELETE',
    ...(options || {}),
    headers: {
      Authorization: 'AABBCC',
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {},
  });
}

export async function searchWord(word: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>(URL + '/word/find?word=' + word, {
    method: 'GET',
    ...(options || {}),
    headers: {
      Authorization: 'AABBCC',
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {},
  });
}
