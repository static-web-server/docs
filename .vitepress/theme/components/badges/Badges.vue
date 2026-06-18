<script setup lang="ts"></script>
<style scoped>
.badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    justify-content: center;
}
.badges a {
    display: inline-block;
}
.badges img {
    margin: 0;
}
</style>
<template>
    <div class="badges">
        <a href="https://github.com/static-web-server/static-web-server/actions/workflows/devel.yml"
            title="devel ci"><img
                src="https://github.com/static-web-server/static-web-server/actions/workflows/devel.yml/badge.svg?branch=master"></a>
        <a href="https://hub.docker.com/r/joseluisq/static-web-server/"
            title="Docker Image Version (tag latest semver)"><img
                src="https://img.shields.io/docker/v/joseluisq/static-web-server/2"></a>
        <a href="https://hub.docker.com/r/joseluisq/static-web-server/tags" title="Docker Image Size (tag)"><img
                src="https://img.shields.io/docker/image-size/joseluisq/static-web-server/2"></a>
        <a href="https://hub.docker.com/r/joseluisq/static-web-server/" title="Docker Image"><img
                src="https://img.shields.io/docker/pulls/joseluisq/static-web-server.svg"></a>
        <a href="https://crates.io/crates/static-web-server" title="static-web-server crate"><img
                src="https://img.shields.io/crates/v/static-web-server.svg"></a>
        <a href="https://docs.rs/static-web-server" title="static-web-server crate docs"><img
                src="https://img.shields.io/docsrs/static-web-server/latest?label=docs.rs"></a>
        <a href="https://github.com/static-web-server/static-web-server/blob/master/LICENSE-APACHE"
            title="static-web-server license"><img src="https://img.shields.io/crates/l/static-web-server"></a>
        <a href="https://discord.gg/VWvtZeWAA7" title="Static Web Server Community on Discord">
            <img src="https://img.shields.io/discord/1086203405225164842?logo=discord&label=discord">
        </a>
    </div>
</template>
