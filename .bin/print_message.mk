define print_message
	declare -x type="success"; \
	if [ ! -z "$(2)" ]; then type=($2); fi; \
	case "$$type" in \
		"error") \
			printf "%b%s %s%b\n" ${COLOR_RED} "$(call timestamp)" $1 ${COLOR_RESET}; \
			;; \
		"success") \
			printf "%b%s %s%b\n" ${COLOR_GREEN} "$(call timestamp)" $1 ${COLOR_RESET}; \
			;; \
		"warn") \
			printf "%b%s %s%b\n" ${COLOR_YELLOW} "$(call timestamp)" $1 ${COLOR_RESET}; \
			;; \
	esac
endef
