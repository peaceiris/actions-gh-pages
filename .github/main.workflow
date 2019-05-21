workflow "Main workflow" {
  on = "push"
  resolves = ["docker-build"]
}

action "docker-build" {
  uses = "actions/docker/cli@master"
  args = "build -t peaceiris/actions-gh-deploy ."
}
