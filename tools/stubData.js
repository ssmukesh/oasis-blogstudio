var Tools = function () {

    this.getBlogHTML = function () {
        return `
        <div class="jumbotron">

	<h1 class="display-4">Hello, world!</h1>

	<p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
	<hr class="my-4">

	<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>

	<p class="lead"><a class="btn btn-primary btn-lg" href="#">Learn more</a></p>
</div>
        `;
    }

    this.getBlogHTMLWithImage = function () {
        return `
        <p>Hello <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f603.svg);">&nbsp;</span>&nbsp;</p>

<p>Welcome to Blog Studio</p>

<p><img src="https://i.froala.com/assets/photo5.jpg" data-id="5" data-type="image" data-name="Image 2017-12-27 at 04:12:32.jpg" style="width: 300px;" class="fr-fic fr-dib fr-fil"></p>
<div class="jumbotron">

	<h1 class="display-4">Hello, world!</h1>

	<p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
	<hr class="my-4">

	<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>

	<p class="lead"><a class="btn btn-primary btn-lg" href="#">Learn more</a></p>
</div>
`;

    }

    this.getBlogHTMLWithImageVideo = function () {
        return `
        <p>Hello <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f603.svg);">&nbsp;</span>&nbsp;</p>

<p><span class="fr-video fr-fvc fr-dvb fr-draggable" contenteditable="false" draggable="true"><iframe width="640" height="360" src="https://www.youtube.com/embed/pU9Q6oiQNd0?wmode=opaque" frameborder="0" allowfullscreen=""></iframe></span>
	<br>
</p>

<p>Welcome to Blog Studio</p>

<p><img src="https://i.froala.com/assets/photo5.jpg" data-id="5" data-type="image" data-name="Image 2017-12-27 at 04:12:32.jpg" style="width: 300px;" class="fr-fic fr-dib fr-fil"></p>
<div class="jumbotron">

	<h1 class="display-4">Hello, world!</h1>

	<p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
	<hr class="my-4">

	<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>

	<p class="lead"><a class="btn btn-primary btn-lg" href="#">Learn more</a></p>
</div>

`;
    }

}

module.exports = new Tools();