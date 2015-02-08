<?php 
	
	$signedin = true;
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui=1">
        <title>Powergamer.se</title>
        
		<!-- External resources -->
		<script type="text/javascript" src="https://www.youtube.com/player_api"></script>
		
		<!-- Local resources -->
        <link href="build/styles/main.css?v=5" media="all" rel="stylesheet" type="text/css" />
        <link href="http://mediaelementjs.com/js/mejs-2.16.3/mediaelementplayer.min.css" media="all" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="build/scripts/components.min.js?v=5"></script>
        
        <script type="text/javascript" src="build/scripts/main.min.js?v=5"></script>
    </head>
    <body>
		<div class="drawer-favorites">
			<a href="#close" class="close"></a>
			<h2 class="section-title">Favoriter</h2>
			<div class="drawer-inner">
				<?php include "parts/article-list-favorites.php" ?>
			</div>
		</div>
		<header class="header header-main">
			<div class="inner">
				<div class="left">
					<a class="logo"></a>
				</div>
				<div class="center">
					
				</div>
				<?php if($signedin): ?>
					<div class="user-panel">
						<div class="user-controlls">
							<button class="user-controll messages notify" data-icon="A" data-number="2"></button>
							<button class="user-controll drawer" data-icon="B"></button>
							<button class="user-controll signout" data-icon="C"></button>
							<img src="http://www.powergamer.se/imglibrary/nyheter/avatars/1/eb4938053b31e611e7999812adc500d8-bpfull.jpg" class="user-image"/>
						</div>
					</div>
				
				<?php else : ?>
					<div class="right">

							

							<div class="icon-holder">
								<a class="rounded-icon rounded-icon-favorites" data-icon="l" href="#show-fav"></a>
								<a class="rounded-icon rounded-icon-user" data-icon="b" href="#userlogin"></a>
							</div>

						<!-- 
						<div class="header-search">
							<div class="input-holder-search">
								<input type="text" placeholder="Sök"/>
							</div>
						</div> 
						-->
					</div>
				<?php endif ?>
			</div>
			<div class="menu menu-main">
				<div class="inner">
					<a class="menu-link" href="#home">Nyheter</a>
					<a class="menu-link" href="#review">Recensioner</a>
					<a class="menu-link" href="#articles">Artiklar</a>
					<a class="menu-link" href="#hardware">Hårdvara</a>
					<a class="menu-link" href="#video">Videos</a>
					<a class="menu-link" href="#podcasts">Podcasts</a>
					<a class="menu-link" href="#community">Community</a>
					<a class="menu-link" href="#forum">Forum</a>
				</div>
			</div>
		</header>