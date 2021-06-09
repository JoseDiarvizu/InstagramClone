class User{
    constructor(userid, name, username, password, email, biography, phone, ispublic){
        this.userid = userid;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.biography = biography;
        this.phone = phone;
        this.ispublic = ispublic;
    }
}

module.exports = User;