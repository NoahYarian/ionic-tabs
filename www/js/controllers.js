angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ReposCtrl', function($scope, $http) {
  $scope.repoArr = [];
  $http.get('https://api.github.com/search/repositories?q=stars:%3E=500&page=1&language=javascript&order=stars')
    .success(function(data) {
      $scope.repos = data;
      $.each(data.items, function(repoIndex, repo) {
        $scope.repoArr.push({
          name: repo.name,
          avatar: repo.owner.avatar_url,
          description: repo.description,
          homepage: repo.homepage,
          repoUrl: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          created: repo.created_at,
          updated: repo.updated_at
        });
      });
    });
});
