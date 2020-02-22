import React, { Component } from 'react'
import { 
  withRouter,
} from 'react-router-dom'
import { connect } from "react-redux"
import { 
  Table,
  Input,
  message,
  Button,
  Icon 
} from 'antd'
import { search_by_user } from '../actions/actionCreators'
import PropTypes from 'prop-types'
import Toptitle from '../components/toptitle'
import Sider from '../components/sider'
import Highlighter from 'react-highlight-words'
import 'antd/dist/antd.css'

class Record extends Component {
    constructor(props) {   
        super(props);
        this.state = {
            data: [],
            loading: false,
            search: false,
            searchText: '',
            searchedColumn: '',
        }
    }

    // 列内查询并展示结果
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              className="search_input"
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
              // width: 188,
            />
            <Button
              className="search_button"
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon="search"
              size="small"
              style={{ marginRight: 8 }}
              // width: 90,
            >
              Search
            </Button>
            <Button 
              className="reset_button"
              onClick={() => this.handleReset(clearFilters)} 
              size="small" 
              // style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
    });
    
    // 列内查询操作
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    // 清楚查询操作
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };

    // 查询后台数据库中用户访问记录
    handleRecordSearch = () => {
        this.setState({ loading: true });
        const { 
          user, 
          nums, 
          rec,
          msg
        } = this.props
        this.props.search_by_user({'user': user})
        const pagination = { ...this.state.pagination };
        pagination.total = nums
        this.setState({
            loading: false,
            search: true,
            data: rec,
            pagination,
        });
        if(msg){
          message.error(msg)
        }
    }

    handleTableChange = (pagination, filters, sorter, extra) => {  // Chrome-F12中打印信息
        console.log('params', pagination, filters, sorter, extra)
    }

    render () {
        const { 
          user, 
          nums
        } = this.props 
        const columns = [
            {
                title: '名称',
                dataIndex: 'user', // 此处应和后端数据库表的对应列名一致
                key: 'user',
                width: '10%'
            },
            {
                title: '访问时间',
                dataIndex: 'date',
                key: 'date',
                sorter: (a,b) => {
                    var date_a = new Date(a.date)
                    var date_b = new Date(b.date)
                    var da = date_a.getTime()
                    var db = date_b.getTime()   //日期字符串转换为时间戳排序
                    return da > db ? 1 : -1;
                },
                width: '20%',
                defaultSortOrder: 'descend',
                ...this.getColumnSearchProps('date'),
            },
            {
                title: '问题',
                dataIndex: 'vqa_ques',
                key: 'vqa_ques',
                width: '39%',
                ...this.getColumnSearchProps('vqa_ques'),
            },
            {
                title: '回答',
                dataIndex: 'vqa_ans',
                key: 'vqa_ans',
                width: '16%',
                ...this.getColumnSearchProps('vqa_ans'),
            },
            {
                title: '响应时间(秒)',
                dataIndex: 'interaction',
                key: 'interaction',
                width: '15%',
                sorter: (a,b) => a.interaction-b.interaction,
                // sorter: true,
                defaultSortOrder: 'ascend'
            }
        ];
        return (
            <div className='whole'>
                <Toptitle /><br />
                <div className='sider-reco'>
                    <Sider />
                    <div className="reco" >
                        <h1 className='h1'>
                            &nbsp;用户&nbsp;{user}&nbsp;的访问记录&nbsp;&nbsp;
                            <Button 
                              type="primary" 
                              onClick={this.handleRecordSearch}
                            >
                              <Icon type="search"/>点击查询吧~
                            </Button>
                            &nbsp;&nbsp;
                            { this.state.search ? `共 ${nums} 条` : null }
                        </h1>
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            pagination={{ pageSize: 8 }}
                            loading={this.state.loading}
                            onChange={this.handleTableChange}
                            showTotal={(range) => `${range[0]}-${range[1]} of ${nums} items`}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
// 验证组件中的参数类型
Record.propTypes = {
    user: PropTypes.string.isRequired,
    rec: PropTypes.array.isRequired,
    nums: PropTypes.number.isRequired,
    msg: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return  (state => state.vqa_user)
}

export default withRouter(connect(
        mapStateToProps,
        { search_by_user }    
    )(Record)
)