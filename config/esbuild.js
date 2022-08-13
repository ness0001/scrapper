import esbuild from 'esbuild'

const entryPoints = ['src/sw.js', 'src/scripts/scrapper.js', 'src/scripts/popUp.js', 'src/scripts/scrappProfiles.js']

esbuild.build({
    
    entryPoints,
    watch: true,
    bundle : true,
    outdir: 'dist',
    minify: true,
    target: 'chrome106'

}).then(response => console.log(JSON.stringify(response))).catch(err => console.log(err))
