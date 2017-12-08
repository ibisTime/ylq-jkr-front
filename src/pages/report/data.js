const testData = [
  {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M03'},
      {'description': '编号', 'key': 'id', 'value': 'edcc7bf163b194a4e627eb160489a055'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 7, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M03'},
      {'description': '编号', 'key': 'id', 'value': 'a6e3ac5ae5704edac7d5f84940e543a4'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001002',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M02'},
      {'description': '编号', 'key': 'id', 'value': 'c16dcb0783cddb4be75fece7132c3f82'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-10'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M05'},
      {'description': '编号', 'key': 'id', 'value': '692a1ce781c2e2393828ebb7c3590fbe'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-10'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001004',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M04'},
      {'description': '编号', 'key': 'id', 'value': '8ca6f686c2252525d0ec3609bb2ef245'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 3,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M02'},
      {'description': '编号', 'key': 'id', 'value': 'fd73e897765629953c95e1699458d8fd'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M06'},
      {'description': '编号', 'key': 'id', 'value': '703720f7eea9052174cc675031658527'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001002',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M03'},
      {'description': '编号', 'key': 'id', 'value': '3e0754d4bbb921be26d0f79ffb3699bf'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-10'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001002',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M03'},
      {'description': '编号', 'key': 'id', 'value': 'fbae45feed17fb79858d211850c68d29'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-10'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M05'},
      {'description': '编号', 'key': 'id', 'value': '7edb8b291f073d166fb881e41bc41c57'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M02'},
      {'description': '编号', 'key': 'id', 'value': 'f8627086195b946cf9be07ac9340e35a'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M05'},
      {'description': '编号', 'key': 'id', 'value': '2f73e0682bc0c5c5f829b6ba5209e366'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M02'},
      {'description': '编号', 'key': 'id', 'value': 'be3f716be2ab76a6a7e7a0950c82eae4'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [{'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M03'},
      {'description': '编号', 'key': 'id', 'value': '9d88d3991d3e0ff80f5df9cbbd0ccf4c'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}],
    'level': 2,
    'refreshTime': 'Dec 6, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001002',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M01'},
      {'description': '编号', 'key': 'id', 'value': 'a5bb271413f642c280ee68d37378171f'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-10'}
    ],
    'level': 2,
    'refreshTime': 'Dec 5, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M01'},
      {'description': '编号', 'key': 'id', 'value': '13a88de77d214897a812ebaac277923d'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 5, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M04'},
      {'description': '编号', 'key': 'id', 'value': '3e75ee55728430d945f2c962832bd84e'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}],
    'level': 2,
    'refreshTime': 'Dec 5, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [{'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M04'},
      {'description': '编号', 'key': 'id', 'value': '057c2b951226763fb1930e7e527d987a'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Dec 1, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001003',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M02'},
      {'description': '编号', 'key': 'id', 'value': 'fce81939053392cb6bdd8e1caabb0edc'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Nov 22, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }, {
    'bizCode': 'AA',
    'code': 'AA001002',
    'extendInfo': [
      {'description': '逾期金额（元）', 'key': 'event_max_amt_code', 'value': 'M05'},
      {'description': '编号', 'key': 'id', 'value': 'e9833f4916fcdeba44f732ebbc386b21'},
      {'description': '违约时间', 'key': 'event_end_time_desc', 'value': '2017-09'}
    ],
    'level': 2,
    'refreshTime': 'Nov 17, 2017 12:00:00 AM',
    'settlement': false,
    'type': 'AA001'
  }
];

export default testData;
