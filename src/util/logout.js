export default {
    logout:() => {
        localStorage.clear();
        this.$router.push('/login');
    }
}