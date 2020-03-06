# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [3.6.0-0](https://github.com/peaceiris/actions-gh-pages/compare/v3.5.0...v3.6.0-0) (2020-03-06)


### feat

* Use rsync instead of io.cp() ([5d8f5a1](https://github.com/peaceiris/actions-gh-pages/commit/5d8f5a15f78784a868a9744f3b343232dbcbd918))

### fix

* Use io.cp() on windows ([4614605](https://github.com/peaceiris/actions-gh-pages/commit/46146058b69b014134a7d788299d643e83cc3176))



# [3.5.0](https://github.com/peaceiris/actions-gh-pages/compare/v3.4.1...v3.5.0) (2020-03-06)


### deps

* bump node 12.15.0 to 12.16.1 (#142) ([ade8887](https://github.com/peaceiris/actions-gh-pages/commit/ade88874791f5b67d0c475d6dffb5219ed4407f1)), closes [#142](https://github.com/peaceiris/actions-gh-pages/issues/142)

### docs

* improve description of enable_jekyll=disable_nojekyll (see #130) (#132) ([b76751b](https://github.com/peaceiris/actions-gh-pages/commit/b76751b9eefaaf771ce31d8ef3c69a8d907f535d)), closes [#130](https://github.com/peaceiris/actions-gh-pages/issues/130) [#132](https://github.com/peaceiris/actions-gh-pages/issues/132) [#130](https://github.com/peaceiris/actions-gh-pages/issues/130)

### feat

* Add enable_jekyll (#143) ([dc1169c](https://github.com/peaceiris/actions-gh-pages/commit/dc1169c5baf9ed1205d6f0f9c9ce0e6d26afb164)), closes [#143](https://github.com/peaceiris/actions-gh-pages/issues/143) [#130](https://github.com/peaceiris/actions-gh-pages/issues/130) [#132](https://github.com/peaceiris/actions-gh-pages/issues/132)



# [3.5.0-0](https://github.com/peaceiris/actions-gh-pages/compare/v3.4.1...v3.5.0-0) (2020-03-06)


### deps

* bump node 12.15.0 to 12.16.1 (#142) ([ade8887](https://github.com/peaceiris/actions-gh-pages/commit/ade88874791f5b67d0c475d6dffb5219ed4407f1)), closes [#142](https://github.com/peaceiris/actions-gh-pages/issues/142)

### feat

* Add enable_jekyll ([1fff2ca](https://github.com/peaceiris/actions-gh-pages/commit/1fff2ca84a6b42067a86c6229774aa5e2891a661))



## [3.4.1](https://github.com/peaceiris/actions-gh-pages/compare/v3.4.0...v3.4.1) (2020-03-06)


### ci

* Add deployment status check workflow (#125) ([b81e21a](https://github.com/peaceiris/actions-gh-pages/commit/b81e21a3dc037a4037bef6bd44bc1bee36d3626f)), closes [#125](https://github.com/peaceiris/actions-gh-pages/issues/125)

### deps

* bump @actions/core from 1.2.2 to 1.2.3 (#140) ([ac39f89](https://github.com/peaceiris/actions-gh-pages/commit/ac39f890622b7f6950b6eb9cc43666c033277fb1)), closes [#140](https://github.com/peaceiris/actions-gh-pages/issues/140)
* bump @types/node from 12.12.28 to 12.12.29 (#136) ([dd0b5df](https://github.com/peaceiris/actions-gh-pages/commit/dd0b5dfc6981e11137b2a1fad785d5342c0b5bc0)), closes [#136](https://github.com/peaceiris/actions-gh-pages/issues/136)
* bump @typescript-eslint/eslint-plugin from 2.20.0 to 2.21.0 (#128) ([ce61f4b](https://github.com/peaceiris/actions-gh-pages/commit/ce61f4bf52b32c725cd5837e7b56d7a587a32af6)), closes [#128](https://github.com/peaceiris/actions-gh-pages/issues/128)
* bump @typescript-eslint/eslint-plugin from 2.21.0 to 2.22.0 (#139) ([9faed51](https://github.com/peaceiris/actions-gh-pages/commit/9faed51ce97835a66741dc3d9368dc3402c12174)), closes [#139](https://github.com/peaceiris/actions-gh-pages/issues/139)
* bump @typescript-eslint/parser from 2.20.0 to 2.21.0 (#127) ([bc18026](https://github.com/peaceiris/actions-gh-pages/commit/bc18026d43cd46451191723b7502ac0057177f5c)), closes [#127](https://github.com/peaceiris/actions-gh-pages/issues/127)
* bump @typescript-eslint/parser from 2.21.0 to 2.22.0 (#138) ([7c45cb4](https://github.com/peaceiris/actions-gh-pages/commit/7c45cb42cade3f3bc0dab3c894044809b8ed4b4a)), closes [#138](https://github.com/peaceiris/actions-gh-pages/issues/138)
* bump eslint-plugin-jest from 23.8.0 to 23.8.1 (#134) ([50988c1](https://github.com/peaceiris/actions-gh-pages/commit/50988c17ae540cf540cac254aeae22e8f1cbad46)), closes [#134](https://github.com/peaceiris/actions-gh-pages/issues/134)
* bump eslint-plugin-jest from 23.8.1 to 23.8.2 (#141) ([acd0462](https://github.com/peaceiris/actions-gh-pages/commit/acd04627103a2d4d7620edca1bb74897a8180a84)), closes [#141](https://github.com/peaceiris/actions-gh-pages/issues/141)
* bump lint-staged from 10.0.7 to 10.0.8 (#129) ([56fe697](https://github.com/peaceiris/actions-gh-pages/commit/56fe6978255c0fb44f70c59879daca5984de7ac4)), closes [#129](https://github.com/peaceiris/actions-gh-pages/issues/129)
* bump typescript from 3.8.2 to 3.8.3 (#135) ([140391d](https://github.com/peaceiris/actions-gh-pages/commit/140391da91a8b458871e276b87abbfe7c0557c8c)), closes [#135](https://github.com/peaceiris/actions-gh-pages/issues/135)

### docs

* Add Docusaurus example (#131) ([a4da635](https://github.com/peaceiris/actions-gh-pages/commit/a4da635d8c553a327144267b3826e838aefb1561)), closes [#131](https://github.com/peaceiris/actions-gh-pages/issues/131)

### test

* Add testing for set-tokens.ts (#126) ([fd6e5fc](https://github.com/peaceiris/actions-gh-pages/commit/fd6e5fc7ce07cfd94a2311f7ac112bd797c3aee7)), closes [#126](https://github.com/peaceiris/actions-gh-pages/issues/126)



# [3.4.0](https://github.com/peaceiris/actions-gh-pages/compare/v3.3.0...v3.4.0) (2020-02-24)


### deps

* bump eslint-plugin-jest from 23.7.0 to 23.8.0 (#124) ([e0af1f7](https://github.com/peaceiris/actions-gh-pages/commit/e0af1f7de04642a5e810c38b24abd507d81b86be)), closes [#124](https://github.com/peaceiris/actions-gh-pages/issues/124)

### docs

* Put github_token as first example (#115) ([62e7849](https://github.com/peaceiris/actions-gh-pages/commit/62e7849d7ab5a2167baf529dc8fd9034fcf41c43)), closes [#115](https://github.com/peaceiris/actions-gh-pages/issues/115)
* update ([7b12ca9](https://github.com/peaceiris/actions-gh-pages/commit/7b12ca9aebe1ddcf25dc1c6fd793308e703b4ec7))



# [3.3.0](https://github.com/peaceiris/actions-gh-pages/compare/v3.2.0...v3.3.0) (2020-02-24)


### deps

* bump @actions/github from 2.1.0 to 2.1.1 (#120) ([5d3cd50](https://github.com/peaceiris/actions-gh-pages/commit/5d3cd509d9e8ab8ba8b6c6981eb8ecb077ab2109)), closes [#120](https://github.com/peaceiris/actions-gh-pages/issues/120)
* bump @types/jest from 25.1.2 to 25.1.3 (#118) ([0b1dd44](https://github.com/peaceiris/actions-gh-pages/commit/0b1dd44709acc2ba27cf43e181767b92e78d1577)), closes [#118](https://github.com/peaceiris/actions-gh-pages/issues/118)
* bump @types/node from 12.12.27 to 12.12.28 (#122) ([b243caf](https://github.com/peaceiris/actions-gh-pages/commit/b243cafb6e6598d71925399552d569a628a42aa7)), closes [#122](https://github.com/peaceiris/actions-gh-pages/issues/122)
* bump @zeit/ncc from 0.21.0 to 0.21.1 (#101) ([6244b19](https://github.com/peaceiris/actions-gh-pages/commit/6244b197b6c5a57172d87769cd03d79cedae9dca)), closes [#101](https://github.com/peaceiris/actions-gh-pages/issues/101)
* bump ts-jest from 25.2.0 to 25.2.1 (#117) ([e1bf32a](https://github.com/peaceiris/actions-gh-pages/commit/e1bf32ad68fadb9a32147579d6dc49b51d6ddefb)), closes [#117](https://github.com/peaceiris/actions-gh-pages/issues/117)
* bump typescript from 3.7.5 to 3.8.2 (#121) ([e58a6c1](https://github.com/peaceiris/actions-gh-pages/commit/e58a6c156e7249d4e6052539e2ed0aa449bdd4f4)), closes [#121](https://github.com/peaceiris/actions-gh-pages/issues/121)

### feat

* Add disable_nojekyll and cname options (#119) ([00fde1e](https://github.com/peaceiris/actions-gh-pages/commit/00fde1eb97e54d4fa89f31806ff2815878fafcb6)), closes [#119](https://github.com/peaceiris/actions-gh-pages/issues/119) [/github.com/peaceiris/actions-gh-pages/issues/112#issuecomment-589678269](https://github.com//github.com/peaceiris/actions-gh-pages/issues/112/issues/issuecomment-589678269) [#112](https://github.com/peaceiris/actions-gh-pages/issues/112)



# [3.3.0-0](https://github.com/peaceiris/actions-gh-pages/compare/v3.2.0...v3.3.0-0) (2020-02-20)


### chore

* Add vim ([b9a6975](https://github.com/peaceiris/actions-gh-pages/commit/b9a697582713e95c1d628172933226631d3825af))

### deps

* bump @types/jest from 25.1.2 to 25.1.3 (#118) ([0b1dd44](https://github.com/peaceiris/actions-gh-pages/commit/0b1dd44709acc2ba27cf43e181767b92e78d1577)), closes [#118](https://github.com/peaceiris/actions-gh-pages/issues/118)
* bump ts-jest from 25.2.0 to 25.2.1 (#117) ([e1bf32a](https://github.com/peaceiris/actions-gh-pages/commit/e1bf32ad68fadb9a32147579d6dc49b51d6ddefb)), closes [#117](https://github.com/peaceiris/actions-gh-pages/issues/117)

### feat

* Add disable_nojekyll and cname options ([7c4b591](https://github.com/peaceiris/actions-gh-pages/commit/7c4b591cf65cf4daf0464fba89b32ff4e764b427)), closes [#112](https://github.com/peaceiris/actions-gh-pages/issues/112)



# [3.2.0](https://github.com/peaceiris/actions-gh-pages/compare/v3.1.0...v3.2.0) (2020-02-19)


### feat

* Remove warning about GITHUB_TOKEN (#108) ([74f652a](https://github.com/peaceiris/actions-gh-pages/commit/74f652acfdfc3290f8b6f7c5e65fd1f563412cf5)), closes [#108](https://github.com/peaceiris/actions-gh-pages/issues/108) [#9](https://github.com/peaceiris/actions-gh-pages/issues/9)



# [3.1.0](https://github.com/peaceiris/actions-gh-pages/compare/v3.0.3...v3.1.0) (2020-02-19)


### deps

* bump @types/jest from 25.1.1 to 25.1.2 (#93) ([aec195e](https://github.com/peaceiris/actions-gh-pages/commit/aec195ebb4e984f62f48139a5e24aa85ea31e891)), closes [#93](https://github.com/peaceiris/actions-gh-pages/issues/93)
* bump @types/node from 13.7.0 to 13.7.1 (#99) ([0b00dd2](https://github.com/peaceiris/actions-gh-pages/commit/0b00dd2a9f91c1854f4b1cfe68dc30891ebccc9f)), closes [#99](https://github.com/peaceiris/actions-gh-pages/issues/99)
* bump @types/node from 13.7.1 to 13.7.2 (#110) ([591c4bd](https://github.com/peaceiris/actions-gh-pages/commit/591c4bdf2ee1c6aa5f1958c4553902feac06dcfe)), closes [#110](https://github.com/peaceiris/actions-gh-pages/issues/110)
* bump @typescript-eslint/eslint-plugin from 2.19.0 to 2.19.2 (#97) ([5d5e933](https://github.com/peaceiris/actions-gh-pages/commit/5d5e9338ccbca63f80f5ee66ba9e9eff14bacb68)), closes [#97](https://github.com/peaceiris/actions-gh-pages/issues/97)
* bump @typescript-eslint/eslint-plugin from 2.19.2 to 2.20.0 (#105) ([1c50baa](https://github.com/peaceiris/actions-gh-pages/commit/1c50baa294d259f81459f7a495f8d0d2a50a1b6d)), closes [#105](https://github.com/peaceiris/actions-gh-pages/issues/105)
* bump @typescript-eslint/parser from 2.19.0 to 2.19.2 (#96) ([8b52b41](https://github.com/peaceiris/actions-gh-pages/commit/8b52b41ecb191f50bd5efc9ee2c0266a2d171d14)), closes [#96](https://github.com/peaceiris/actions-gh-pages/issues/96)
* bump @typescript-eslint/parser from 2.19.2 to 2.20.0 (#106) ([73c09c7](https://github.com/peaceiris/actions-gh-pages/commit/73c09c703e63c0b442ffa50624ace10eaa929280)), closes [#106](https://github.com/peaceiris/actions-gh-pages/issues/106)
* bump eslint-plugin-jest from 23.6.0 to 23.7.0 (#95) ([0a1a581](https://github.com/peaceiris/actions-gh-pages/commit/0a1a58196ba5bf48e168475e0ac3898fbd3043e2)), closes [#95](https://github.com/peaceiris/actions-gh-pages/issues/95)
* bump husky from 4.2.1 to 4.2.3 (#102) ([49a6939](https://github.com/peaceiris/actions-gh-pages/commit/49a6939dbb77d7656228cdc3bed6a99d5124a6b2)), closes [#102](https://github.com/peaceiris/actions-gh-pages/issues/102)
* bump node from 12.14.1 to 12.15.0 (#94) ([0e542f9](https://github.com/peaceiris/actions-gh-pages/commit/0e542f9f9231c005e1a6363a33a69fdbde436085)), closes [#94](https://github.com/peaceiris/actions-gh-pages/issues/94)
* Rollback @types/node 13 to 12 (#111) ([195ab80](https://github.com/peaceiris/actions-gh-pages/commit/195ab8005d4af142c40fd8e53a59783b697d75d9)), closes [#111](https://github.com/peaceiris/actions-gh-pages/issues/111)

### docs

* fix ([60c31d2](https://github.com/peaceiris/actions-gh-pages/commit/60c31d23a8a096624a3b9a0955a05ea9941dc140))
* rename author to Maintainer ([4101589](https://github.com/peaceiris/actions-gh-pages/commit/41015898aad0abad9d0760bc576e4748e476d4f9))
* update job name ([752214a](https://github.com/peaceiris/actions-gh-pages/commit/752214aa33756f6e097f908671681a13865a9991))
* update publish_branch for v3 ([a7866b5](https://github.com/peaceiris/actions-gh-pages/commit/a7866b5bd3a121a460c8c39cb1c9d1586db6b231))
* update status of github_token ([1887981](https://github.com/peaceiris/actions-gh-pages/commit/1887981f72e59b54f68febb4fa4786e7e153ef6d))

### fix

* Change final message ([476fa94](https://github.com/peaceiris/actions-gh-pages/commit/476fa94197aea4d3f74e5619ae77ebf966fd5fff))
* Use onetime workdir name (#109) ([2f5ccc9](https://github.com/peaceiris/actions-gh-pages/commit/2f5ccc92dfcf8e85d9d3c19dc842a440380253bf)), closes [#109](https://github.com/peaceiris/actions-gh-pages/issues/109)

### refactor

* fix typo and remove useless function (#107) ([55a68e3](https://github.com/peaceiris/actions-gh-pages/commit/55a68e34ca406d99b5b2a4549d7ade5eeb03d860)), closes [#107](https://github.com/peaceiris/actions-gh-pages/issues/107)



## [3.0.4-1](https://github.com/peaceiris/actions-gh-pages/compare/v3.0.4-0...v3.0.4-1) (2020-02-19)


### deps

* bump @types/node from 13.7.1 to 13.7.2 (#110) ([591c4bd](https://github.com/peaceiris/actions-gh-pages/commit/591c4bdf2ee1c6aa5f1958c4553902feac06dcfe)), closes [#110](https://github.com/peaceiris/actions-gh-pages/issues/110)
* Rollback @types/node 13 to 12 (#111) ([195ab80](https://github.com/peaceiris/actions-gh-pages/commit/195ab8005d4af142c40fd8e53a59783b697d75d9)), closes [#111](https://github.com/peaceiris/actions-gh-pages/issues/111)

### fix

* Add await ([0031179](https://github.com/peaceiris/actions-gh-pages/commit/00311793aa104bf99501373756461475b6752f16))
* convert to string ([cbe4d56](https://github.com/peaceiris/actions-gh-pages/commit/cbe4d56fb8bd50d63919f783483f74c694a3dd9b))
* use onetime workdir name ([0d912a1](https://github.com/peaceiris/actions-gh-pages/commit/0d912a1314ce9d77f29bc0c1fada559223dd5563))

### refactor

* Add info message ([8e6c12a](https://github.com/peaceiris/actions-gh-pages/commit/8e6c12a2b5f973c8736f831398d0fe7c980f1431))



## [3.0.4-0](https://github.com/peaceiris/actions-gh-pages/compare/v3.0.3...v3.0.4-0) (2020-02-18)


### chore

* Allow to release from not master ([3c7cd58](https://github.com/peaceiris/actions-gh-pages/commit/3c7cd587e403a76d6725a0e84796cf12a59752f3))

### deps

* bump @types/jest from 25.1.1 to 25.1.2 (#93) ([aec195e](https://github.com/peaceiris/actions-gh-pages/commit/aec195ebb4e984f62f48139a5e24aa85ea31e891)), closes [#93](https://github.com/peaceiris/actions-gh-pages/issues/93)
* bump @types/node from 13.7.0 to 13.7.1 (#99) ([0b00dd2](https://github.com/peaceiris/actions-gh-pages/commit/0b00dd2a9f91c1854f4b1cfe68dc30891ebccc9f)), closes [#99](https://github.com/peaceiris/actions-gh-pages/issues/99)
* bump @typescript-eslint/eslint-plugin from 2.19.0 to 2.19.2 (#97) ([5d5e933](https://github.com/peaceiris/actions-gh-pages/commit/5d5e9338ccbca63f80f5ee66ba9e9eff14bacb68)), closes [#97](https://github.com/peaceiris/actions-gh-pages/issues/97)
* bump @typescript-eslint/eslint-plugin from 2.19.2 to 2.20.0 (#105) ([1c50baa](https://github.com/peaceiris/actions-gh-pages/commit/1c50baa294d259f81459f7a495f8d0d2a50a1b6d)), closes [#105](https://github.com/peaceiris/actions-gh-pages/issues/105)
* bump @typescript-eslint/parser from 2.19.0 to 2.19.2 (#96) ([8b52b41](https://github.com/peaceiris/actions-gh-pages/commit/8b52b41ecb191f50bd5efc9ee2c0266a2d171d14)), closes [#96](https://github.com/peaceiris/actions-gh-pages/issues/96)
* bump @typescript-eslint/parser from 2.19.2 to 2.20.0 (#106) ([73c09c7](https://github.com/peaceiris/actions-gh-pages/commit/73c09c703e63c0b442ffa50624ace10eaa929280)), closes [#106](https://github.com/peaceiris/actions-gh-pages/issues/106)
* bump eslint-plugin-jest from 23.6.0 to 23.7.0 (#95) ([0a1a581](https://github.com/peaceiris/actions-gh-pages/commit/0a1a58196ba5bf48e168475e0ac3898fbd3043e2)), closes [#95](https://github.com/peaceiris/actions-gh-pages/issues/95)
* bump husky from 4.2.1 to 4.2.3 (#102) ([49a6939](https://github.com/peaceiris/actions-gh-pages/commit/49a6939dbb77d7656228cdc3bed6a99d5124a6b2)), closes [#102](https://github.com/peaceiris/actions-gh-pages/issues/102)
* bump node from 12.14.1 to 12.15.0 (#94) ([0e542f9](https://github.com/peaceiris/actions-gh-pages/commit/0e542f9f9231c005e1a6363a33a69fdbde436085)), closes [#94](https://github.com/peaceiris/actions-gh-pages/issues/94)

### docs

* fix ([60c31d2](https://github.com/peaceiris/actions-gh-pages/commit/60c31d23a8a096624a3b9a0955a05ea9941dc140))
* rename author to Maintainer ([4101589](https://github.com/peaceiris/actions-gh-pages/commit/41015898aad0abad9d0760bc576e4748e476d4f9))
* update job name ([752214a](https://github.com/peaceiris/actions-gh-pages/commit/752214aa33756f6e097f908671681a13865a9991))
* update publish_branch for v3 ([a7866b5](https://github.com/peaceiris/actions-gh-pages/commit/a7866b5bd3a121a460c8c39cb1c9d1586db6b231))
* update status of github_token ([1887981](https://github.com/peaceiris/actions-gh-pages/commit/1887981f72e59b54f68febb4fa4786e7e153ef6d))

### fix

* Add removing workDir at the end ([5ba5849](https://github.com/peaceiris/actions-gh-pages/commit/5ba5849ab229d5b6eecc1d13de82e71999961cdc))
* Change final message ([476fa94](https://github.com/peaceiris/actions-gh-pages/commit/476fa94197aea4d3f74e5619ae77ebf966fd5fff))
* tag fetching ([6595e02](https://github.com/peaceiris/actions-gh-pages/commit/6595e02d683d6ca8275d76e2818662da80ac685a))
* tag fetching ([6fe5c9e](https://github.com/peaceiris/actions-gh-pages/commit/6fe5c9e76213b6d5bc542be649cbe0289e947ab6))

### refactor

* fix typo and remove useless function (#107) ([55a68e3](https://github.com/peaceiris/actions-gh-pages/commit/55a68e34ca406d99b5b2a4549d7ade5eeb03d860)), closes [#107](https://github.com/peaceiris/actions-gh-pages/issues/107)



## [3.0.3](https://github.com/peaceiris/actions-gh-pages/compare/v3.0.3-0...v3.0.3) (2020-02-06)


### docs

* update example of publish_branch ([2948e5e](https://github.com/peaceiris/actions-gh-pages/commit/2948e5eda85d99ffc20cda677353918ea9ea3f45))



## [3.0.3-0](https://github.com/peaceiris/actions-gh-pages/compare/v3.0.2...v3.0.3-0) (2020-02-06)


### fix

* Enable to create branch for first deployment (#92) ([1b6740c](https://github.com/peaceiris/actions-gh-pages/commit/1b6740cb30fc6a5a695a015144589862eb241b7d)), closes [#92](https://github.com/peaceiris/actions-gh-pages/issues/92)



## [3.0.2](https://github.com/peaceiris/actions-gh-pages/compare/v3.0.1...v3.0.2) (2020-02-05)


### ci

* use github_token for windows-latest ([cfdf8c4](https://github.com/peaceiris/actions-gh-pages/commit/cfdf8c43ed170ce3bcfc1b4ee5ba50000e89f9e7))

### docs

* Add CodeFactor badge ([0ba5bf3](https://github.com/peaceiris/actions-gh-pages/commit/0ba5bf3eeb5f0ad9e42dc6344afa736b47dac67f))
* Add Supported Platforms table ([f0177d1](https://github.com/peaceiris/actions-gh-pages/commit/f0177d176f9464c11cbdff5a68dbecd6e630e371))
* update log example for v3 ([d35854b](https://github.com/peaceiris/actions-gh-pages/commit/d35854bdf87ba4311c5b5ba738260e4eb89c2295))

### fix

* add debug ([fb54d6a](https://github.com/peaceiris/actions-gh-pages/commit/fb54d6af4d2abbf7a42806620594b173c2f55882))
* add filePath ([f8b5a36](https://github.com/peaceiris/actions-gh-pages/commit/f8b5a36401de48c3bf2fda47a51b010350405163))
* copy directories #89 ([6edc4c9](https://github.com/peaceiris/actions-gh-pages/commit/6edc4c976449147551137b19eb7bc092d9d129ec)), closes [#89](https://github.com/peaceiris/actions-gh-pages/issues/89)
* copy force ([848165c](https://github.com/peaceiris/actions-gh-pages/commit/848165cf9f01c61b1f2e83d433177a9f46ce5ea7))



## [3.0.1](https://github.com/peaceiris/actions-gh-pages/compare/v3.0.0...v3.0.1) (2020-02-05)


### docs

* Add link to v2 ([ec95e8e](https://github.com/peaceiris/actions-gh-pages/commit/ec95e8e7aae2075200c33461a0f3aa640d7fbe02))
* remove Script mode section ([9b3fcdf](https://github.com/peaceiris/actions-gh-pages/commit/9b3fcdf51572449ce5f346724d01e878bd811834))
* remove v2 example ([a1375a4](https://github.com/peaceiris/actions-gh-pages/commit/a1375a463794f123e06ddb6af0d74ef453d74fa0))
* update ([1a26eac](https://github.com/peaceiris/actions-gh-pages/commit/1a26eaca33cf4f1d162fc37fd45cab6ea999140e))
* update for v3 ([1a13108](https://github.com/peaceiris/actions-gh-pages/commit/1a1310886515195d8b9052e68aec5a973dd3779d))
* update for v3 ([d0de38a](https://github.com/peaceiris/actions-gh-pages/commit/d0de38a352de7896c0bc618c3977f00f6a34151d))
* update for v3 ([b3cfcb1](https://github.com/peaceiris/actions-gh-pages/commit/b3cfcb13c0e3d5b76fb2b306fafbc0bfdc349e2e))
* update for v3 ([b1aaa85](https://github.com/peaceiris/actions-gh-pages/commit/b1aaa85b6766b71fd96a06d1ea8a99a5247e7b6c))
* update for v3 ([f1e7cd6](https://github.com/peaceiris/actions-gh-pages/commit/f1e7cd608c631ec6a3c48e1e76f17b6c8a468ada))
* update for v3 ([07a3f29](https://github.com/peaceiris/actions-gh-pages/commit/07a3f2915ef742feb191caf4315f92c5dbe24657))
* update for v3 ([02c3858](https://github.com/peaceiris/actions-gh-pages/commit/02c38586a5b45e217af006473aa99749917bce73))
* update for v3 ([59bbb98](https://github.com/peaceiris/actions-gh-pages/commit/59bbb98387fa6cde2495176555efd39a3c68b6b5))
* update for v3 ([be27dcc](https://github.com/peaceiris/actions-gh-pages/commit/be27dcce4894bf0847e64b2ba676b9de08979d21))
* update for v3 ([ccf71d1](https://github.com/peaceiris/actions-gh-pages/commit/ccf71d1162ce030d5f8aa4bb1e05c45d83912c67))
* update for v3 ([5fe4aa3](https://github.com/peaceiris/actions-gh-pages/commit/5fe4aa3f24fd2a3f7cf683b04c29895c6882c5de))
* update for v3 ([428902c](https://github.com/peaceiris/actions-gh-pages/commit/428902c6cd381168d113898fa3fd53e83ca658b2))
* update for v3 ([00bca7b](https://github.com/peaceiris/actions-gh-pages/commit/00bca7b88cea3a6aff0cd9e90cc297f90981dfe8))
* update GitHub Actions badge ([9cec798](https://github.com/peaceiris/actions-gh-pages/commit/9cec79845182679864d2e9f2b137c1829773b4a0))
* update overview ([c940278](https://github.com/peaceiris/actions-gh-pages/commit/c940278a4c780afbd658b4a3f0f7834039913401))

### feat

* Add getHomeDir() for windows (#86) ([ed21b6a](https://github.com/peaceiris/actions-gh-pages/commit/ed21b6a5942b1be9f75103a2661d908d41ed9ea9)), closes [#86](https://github.com/peaceiris/actions-gh-pages/issues/86)

### refactor

* change to core.debug ([9f11da8](https://github.com/peaceiris/actions-gh-pages/commit/9f11da81ae3ead3c8929c35266dd40a0ddfd2bd1))



# [3.0.0](https://github.com/peaceiris/actions-gh-pages/compare/v3.0.0-1...v3.0.0) (2020-02-05)


### ci

* force_orphan to false ([a150e4e](https://github.com/peaceiris/actions-gh-pages/commit/a150e4e690ab9bfcecae05b68c8efd14edac15df))

### fix

* action title ([0629bab](https://github.com/peaceiris/actions-gh-pages/commit/0629babb090ceea68f118101b903a8e6798b2962))



# [3.0.0-1](https://github.com/peaceiris/actions-gh-pages/compare/v2.10.1...v3.0.0-1) (2020-02-05)


### chore

* Change update_schedule from weekly to daily ([d3edcde](https://github.com/peaceiris/actions-gh-pages/commit/d3edcde28b32bdc18b358182c89a7a729facf37c))

### docs

* [ImgBot] Optimize images (#81) ([d82725c](https://github.com/peaceiris/actions-gh-pages/commit/d82725c632d7b9dd0fac1981cfaf13d4c550d682)), closes [#81](https://github.com/peaceiris/actions-gh-pages/issues/81)
* Add Dart Package peanut for Flutter ([28b05fd](https://github.com/peaceiris/actions-gh-pages/commit/28b05fd3fab1ac4edb3d12ae0cbdc91367279667))
* add Dependabot badge ([bacf0a6](https://github.com/peaceiris/actions-gh-pages/commit/bacf0a61ea8e93bcbbbd20089f87f8c12af605e2))
* Add release feed badge ([2573b61](https://github.com/peaceiris/actions-gh-pages/commit/2573b6139ba429078ddf457eb170b4af924c55a4))
* fix list ([96360d5](https://github.com/peaceiris/actions-gh-pages/commit/96360d5a85f6f54d3fb5175c158179b57a0149cc))
* Update OGP image ([e504bd5](https://github.com/peaceiris/actions-gh-pages/commit/e504bd5c3862941f5d03ce8d649329e9d5e105aa))
* update support table about GITHUB_TOKEN ([14069e7](https://github.com/peaceiris/actions-gh-pages/commit/14069e75e2e9646aeed42fedb5b99aa31ead3b90))

### feat

* Add TypeScript Action (#83) ([68b21c1](https://github.com/peaceiris/actions-gh-pages/commit/68b21c12af25bc606f77a7b5674f162f3a17bf22)), closes [#83](https://github.com/peaceiris/actions-gh-pages/issues/83) [#54](https://github.com/peaceiris/actions-gh-pages/issues/54)
