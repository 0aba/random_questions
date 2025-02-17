<template>
  <main class="container">
    <nav>
      <RouterLink :to="{ name: 'list-questions' }" class="lnk-to-page">Goto page list questions</RouterLink>
      <RouterLink :to="{ name: 'random-list' }" class="lnk-to-page">Goto page random list</RouterLink>
    </nav>
    <RouterView />
  </main>
</template>

<style>

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5%;
  margin: 5px 5px 5px 5px;
}

.lnk-to-page {
  text-decoration: none;
  color: var(--lnk-router-color);
  border: 1px solid var(--elements-color);
  background: var(--elements-color);
  border-radius: 3px;
  text-align: center;
  width: 49%;
  height: 100%;
}


.lnk-to-page:hover {
  color: var(--lnk-router-hover-color)
}
</style>