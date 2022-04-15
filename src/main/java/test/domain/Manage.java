package test.domain;

public class Manage {
    String id;
    String password;
    private String lou;

    public Manage() {
    }

    public Manage(String id, String password, String lou) {
        this.id = id;
        this.password = password;
        this.lou = lou;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLou() {
        return lou;
    }

    public void setLou(String lou) {
        this.lou = lou;
    }

    @Override
    public String toString() {
        return "Manage{" +
                "id='" + id + '\'' +
                ", password='" + password + '\'' +
                ", lou='" + lou + '\'' +
                '}';
    }
}
