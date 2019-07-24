SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `t_testproject`;
CREATE TABLE `t_testproject` (
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `project_name` varchar(64) NOT NULL COMMENT '项目名称',
  PRIMARY KEY (`project_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_casetype`;
CREATE TABLE `t_casetype` (
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `case_type` varchar(64) NOT NULL COMMENT '用例类型',
  PRIMARY KEY (`case_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_testcase`;
CREATE TABLE `t_testcase` (
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` DATETIME NOT NULL COMMENT '更新时间',
  `project_name` varchar(64) NOT NULL COMMENT '项目名称',
  `case_name` varchar(64) NOT NULL COMMENT '用例名称',
  `case_descript` varchar(256) NOT NULL COMMENT '用例描述',
  `case_result` tinyint(1) NOT NULL COMMENT '用例结果',
  `case_type` varchar(64) NOT NULL COMMENT '用例类型',
  `case_time` int(11) NOT NULL COMMENT '用例时间',
  `case_start_time` varchar(64) NOT NULL COMMENT '用例开始时间',
  `case_end_time` varchar(64) NOT NULL COMMENT '用例结束时间',
  PRIMARY KEY (`case_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



