<template>
  <div class="min-h-screen bg-mama-bg flex flex-col">
    <LayoutTheNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutTheFooter />
  </div>
</template>
