let navbar = () => {
    return `
    <div class="left">
        <img class="menu" src="../images/menu.png" alt="">
        <img id="logo" src="../images/WhatsApp_Image_2023-02-22_at_11.53.45-removebg-preview.png" alt="">
    </div>
    <div class="right">
        
        
        
        
        <div>
            <i class="fas fa-user"></i>
            <div class="dropdown">
                <span class="dropbtn">Profile</span>
                <div class="dropdown-content">
                    <label for="" id="dark-change"></label>
                    <a href="#">Dark theme</a>
                </div>
            </div>  
        </div>
    </div> 
    `
}
export { navbar }