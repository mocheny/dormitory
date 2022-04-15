package test.domain;

public class Dormitory {
    private int id;
    private String lou;
    private String sex;
    private int num;
    private String s1;
    private String s2;
    private String s3;
    private String s4;

    public Dormitory() {
    }

    public Dormitory(int id, String lou, String sex, int num, String s1, String s2, String s3, String s4) {
        this.id = id;
        this.lou = lou;
        this.sex = sex;
        this.num = num;
        this.s1 = s1;
        this.s2 = s2;
        this.s3 = s3;
        this.s4 = s4;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getS1() {
        return s1;
    }

    public void setS1(String s1) {
        this.s1 = s1;
    }

    public String getS2() {
        return s2;
    }

    public void setS2(String s2) {
        this.s2 = s2;
    }

    public String getS3() {
        return s3;
    }

    public void setS3(String s3) {
        this.s3 = s3;
    }

    public String getS4() {
        return s4;
    }

    public void setS4(String s4) {
        this.s4 = s4;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public String getLou() {
        return lou;
    }

    public void setLou(String lou) {
        this.lou = lou;
    }

    @Override
    public String toString() {
        return "Dormitory{" +
                "id=" + id +
                ", lou='" + lou + '\'' +
                ", sex='" + sex + '\'' +
                ", num=" + num +
                ", s1=" + s1 +
                ", s2=" + s2 +
                ", s3=" + s3 +
                ", s4=" + s4 +
                '}';
    }
}
