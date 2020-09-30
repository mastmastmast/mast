import xhr from './axiosConfig';
import {dialog} from "../assets/js/dialog";


/**
 * 首页相关接口
 * @type {{getEnterpriseList(): *}}
 */
export const home = {
  /**
   * 平台入库企业数统计
   * @returns {Promise<T | never>}
   */
  getEnterpriseCountStatistics() {
    return xhr.request({
      url: 'marketBaseInfo/selectHistvccount',
      method: 'post',
      data: {}
    }).catch(err => {
      dialog.error('获取平台入库企业统计数据失败')
    });

  },
  /**
   * 平台融资总额统计
   * @returns {Promise<T | never>}
   */
  getFinanceAmountStatistics() {
    return xhr.request({
      url: 'marketBaseInfo/selectHistloanamt',
      method: 'post',
      data: {}
    }).catch(err => {
      dialog.error('获取平台融资总额统计数据失败')
    });

  },
  /**
   * 平台服务企业数量统计
   * @returns {Promise<T | never>}
   */
  getServicedEnterpriseStatistics() {
    return xhr.request({
      url: 'marketBaseInfo/selectHistcomp',
      method: 'post',
      data: {}
    }).catch(err => {
      dialog.error('获取平台服务企业数量统计数据失败')
    });

  },
  /**
   * 获取首页的三个列表数据
   * @returns {*}
   */
  getEnterpriseList() {
    return xhr.request({
      url: 'marketBaseInfo/selectPlatformSupport',
      method: 'post',
      data: {}
    }).catch(err => {
      dialog.error('获取平台企业列表数据失败');
    });
  },
  /**
   * 搜索企业
   * @param q 搜索内容
   * @returns {Promise<T | never>}
   */
  searchEnterprise(q) {
    return xhr.request({
      url: 'marketBaseInfo/selectCompanyName',
      method: 'post',
      data: {
        titleName: q,
        pageSize: 20
      }
    }).catch(err => {
      dialog.error('检索企业信息失败')
    });
  },
  /**
   * 搜索企业列表
   * @param params
   * @returns {Promise<T | never>}
   */
  searchEnterpriseList(params) {
    return xhr.request({
      url: 'marketBaseInfo/selectMarketBaseInfo',
      method: 'post',
      data: params
    }).catch(err => {
      dialog.error('检索企业信息失败')
    });
  },
  /**
   * 获取首页的统计数据
   * @returns {Promise<T | never>}
   */
  getStatistics() {
    return xhr.request({
      url: 'marketBaseInfo/selectStatistics',
      method: 'post',
      data: {}
    }).catch(err => {
      dialog.error('获取统计数据失败');
    });
  },
  /**
   * 申报企业数量统计
   */
  getDeclaredCompanyCount() {
    return xhr.request({
      url: 'marketBaseInfo/selectApplyEnterpriseNumber',
      method: 'post',
      data: {}
    }).catch(err => {
      dialog.error('获取申报企业数量统计数据失败');
    });
  },
  /**
   * 获取热力图数据
   */
  getHeatMapData() {
    return xhr.request({
      url: 'marketBaseInfo/selectHeatMap',
      method: 'post',
      data: {}
    }).catch(err => {
      dialog.error('获取热力图统计数据失败');
    });
  },
  /**
   * 获取就业、产业贡献统计数据
   * @returns {Promise<T | never>}
   */
  getContributionInfo() {
    return xhr.request({
      url: 'marketBaseInfo/selectContribution',
      method: 'post',
      data: {}
    }).catch(err => {
      dialog.error('获取就业贡献产业贡献统计数据失败');
    });
  },
  /**
   * 产品融资金额分布（本年度）
   */
  getFinancingAmountDis(){
    return xhr.request({
      url: 'financingAmt/productAmtInfo',
      method: 'post',
      data: {}
    }).catch(err => {
      dialog.error('获取产品融资金额分布数据失败');
    });
  }
};


