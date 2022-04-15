package com.it985.dormitory.mapper;

        import com.baomidou.mybatisplus.core.mapper.BaseMapper;
        import com.it985.dormitory.entity.Late;
        import com.it985.dormitory.entity.Student;
        import org.apache.ibatis.annotations.Mapper;

        import java.util.List;

@Mapper
public interface LateMapper extends BaseMapper<Late> {

    public List<Late> findByPage(int start, int size, String dormBuildingName, String dormName, String searchContent);

    public int findTotalCount(String dormBuildingName, String dormName, String searchContent);

    public Student findByStuNumber(String stuNumber);
}
