-- CreateTable
CREATE TABLE `petani` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `kontak` VARCHAR(191) NULL,
    `alamat` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NULL,
    `harga` DOUBLE NOT NULL,
    `stok` INTEGER NOT NULL,
    `petaniId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `produk` ADD CONSTRAINT `produk_petaniId_fkey` FOREIGN KEY (`petaniId`) REFERENCES `petani`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
