/**
 * 获取key
 */
export const getStorage = (key) => {
    return localStorage.getItem(key);
};

/**
 * 保存key
 * @param {*} key
 * @param {*} value
 */
export const setStorage = (key, value) => {
    localStorage.setItem(key, value);
};

/**
 * 删除key
 */
export const removeStorage = (key) => {
    localStorage.removeItem(key);
};
