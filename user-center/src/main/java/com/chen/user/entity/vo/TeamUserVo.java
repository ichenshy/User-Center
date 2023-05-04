package com.chen.user.entity.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 队伍表
 *
 * @author chensy
 * @TableName team
 */
@Data
public class TeamUserVo implements Serializable {
    private static final long serialVersionUID = 1154664362310234757L;
    /**
     * id
     */
    private Long id;

    /**
     * 队伍名称
     */
    private String name;

    /**
     * 队伍描述
     */
    private String description;

    /**
     * 最大人数
     */
    private Integer maxNum;

    /**
     * 过期时间
     */
    private Date expireTime;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 0-公开 1-私有 2-加密
     */
    private Integer status;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 创建人信息
     */
    private UserVo createUser;
    /**
     * 是否已加入
     */
    private boolean hasJoin;
    /**
     * 加入数
     */
    private Integer hasJoinNum;

}
