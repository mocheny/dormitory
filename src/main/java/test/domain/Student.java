package test.domain;

public class Student {
    private String id;
    private String name;
    private String sex;
    private String college;
    private String dor;
    private String phone;
    private String lou;
    private String account;
    private String password;
    private int late;

    public Student() {
    }

    public Student(String id, String name, String sex, String college, String dor, String phone, String lou, String account, String password, int late) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.college = college;
        this.dor = dor;
        this.phone = phone;
        this.lou = lou;
        this.account = account;
        this.password = password;
        this.late = late;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getDor() {
        return dor;
    }

    public void setDor(String dor) {
        this.dor = dor;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLou() {
        return lou;
    }

    public void setLou(String lou) {
        this.lou = lou;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getLate() {
        return late;
    }

    public void setLate(int late) {
        this.late = late;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", college='" + college + '\'' +
                ", dor='" + dor + '\'' +
                ", phone='" + phone + '\'' +
                ", lou='" + lou + '\'' +
                ", account='" + account + '\'' +
                ", password='" + password + '\'' +
                ", late=" + late +
                '}';
    }
}
