package logger

import (
	"os"
	"strconv"

	"go.uber.org/zap"
)

func CreateLogger() {
	production := os.Getenv("LOG_PRODUCTION")
	isProduction, _ := strconv.ParseBool(production)
	outputPath := "./logs/info.log"
	var logger *zap.Logger
	if isProduction {
		config := zap.NewProductionConfig()
		config.OutputPaths = []string{outputPath}
		logger, _ = config.Build()
	} else {
		logger, _ = zap.NewDevelopment()
	}
	defer logger.Sync()
	zap.ReplaceGlobals(logger)
}
