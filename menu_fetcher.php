// Shortcode to display the 'product-categories' menu
function display_product_categories_menu() {
    $menu = wp_nav_menu(array(
        'menu'            => 'product-categories', // your menu slug
        'container'       => 'nav',
        'container_class' => 'custom-menu-wrapper',
        'menu_class'      => 'custom-menu-items',
        'echo'            => false,
        'fallback_cb'     => false
    ));

    return '<div class="product-categories-menu">' . $menu . '</div>';
}
add_shortcode('product_categories_menu', 'display_product_categories_menu'); // First name is the name you will enter in the shortcode where you ant to show the menu
